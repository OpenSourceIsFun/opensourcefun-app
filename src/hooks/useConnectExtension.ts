import {
  blockExplorerUrls,
  network,
  networkName,
  rpcUrls,
  WCProviderConfig,
} from '@/config/network';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { useCallback, useEffect, useMemo } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import {
  CONNECTED_EVM_WALLET_KEY,
  WALLET_CONNECT_KEY,
} from '@/constants/localStorage';
import { providers } from 'ethers';
import { METAMASK, WALLET_CONNECT, WalletMeta } from '@/constants/wallets';
import {
  cleanEVMStorage,
  getBinanceWalletProvider,
  getCloverProvider,
  getConnectedEVMWallet,
  getEthereumAccount,
  getStoredEVMWallet,
  getSubWalletProvider,
  getTalismanProvider,
} from '@/utils/wallets';
import { resolvePath } from '@/utils/common';
import { sendWalletLogs } from '@/services/walletLogs';
import useUser from '@/hooks/useUser';
import { getInjectedProvider } from '@/utils/getInjectedProvider';
import { Astar } from '@/providers/dApp';

const getNetworkArguments = (
  chainId: number,
  chainName: string,
  rpcUrls: string[],
  blockExplorerUrls: string[],
) => {
  return {
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: `0x${Number(Astar.chainId).toString(16)}`,
        chainName: 'Astar',
        nativeCurrency: {
          name: 'Astar',
          symbol: 'ASTR',
          decimals: 18,
        },
        rpcUrls: [Astar.rpcUrl],
        blockExplorerUrls,
      },
    ],
  };
};

export const useConnectExtension = () => {
  const { user } = useUser();
  const {
    activateBrowserWallet,
    activate,
    account,
    chainId,
    deactivate: disconnectBSC,
    library,
    isLoading,
    switchNetwork,
  } = useEthers();

  const connected = !!chainId;
  const balance = useEtherBalance(account);

  const connectedWallet = useMemo(
    () => getConnectedEVMWallet(library),
    [library],
  );

  const isWrongNetwork = useMemo(
    () => (account && !chainId) || chainId !== Astar.chainId,
    [account, chainId],
  );

  const isMetamaskInstalled = useMemo(() => {
    return window.ethereum?.isMetaMask;
  }, []);

  const isTalismanInstalled = useMemo(() => {
    return !!getTalismanProvider();
  }, []);

  const isSubwalletInstalled = useMemo(() => {
    return !!getSubWalletProvider();
  }, []);

  const isCloverInstalled = useMemo(() => {
    return !!getCloverProvider();
  }, []);

  const isBinanceWalletInstalled = useMemo(() => {
    return !!getBinanceWalletProvider();
  }, []);

  const isOtherEvmWalletInstalled = useMemo(() => {
    const { ethereum } = window as any;
    return (
      !!ethereum &&
      !ethereum.isMetaMask &&
      !ethereum.isTalisman &&
      !ethereum.isSubWallet &&
      !ethereum.isClover
    );
  }, []);

  const switchEthChain = useCallback(async () => {
    const provider = (library as providers.Web3Provider)?.provider;
    const requestArguments = getNetworkArguments(
      network,
      networkName,
      rpcUrls,
      blockExplorerUrls,
    );

    if (
      connectedWallet.extensionName === WALLET_CONNECT.extensionName &&
      provider
    ) {
      try {
        provider.request && (await provider.request(requestArguments));
      } catch (e) {
        console.error(e);
      }
    } else {
      await window.ethereum.request(requestArguments);
      await switchNetwork(Astar.chainId);
    }
  }, [connectedWallet.extensionName, library, switchNetwork]);

  const connectInjected = useCallback(async () => {
    try {
      await activateBrowserWallet();
      const injectedProvider = await getInjectedProvider();

      sendWalletLogs(
        METAMASK.title,
        'bsc',
        await getEthereumAccount(injectedProvider),
        user,
      );

      if (chainId !== Astar.chainId) {
        switchEthChain();
      }
    } catch (error) {
      console.error(error);
    }
  }, [activateBrowserWallet, chainId, switchEthChain, user]);

  const connectWC = useCallback(async () => {
    try {
      const isReconnect = !!localStorage.getItem(WALLET_CONNECT_KEY);
      const provider = new WalletConnectProvider(WCProviderConfig);
      await provider.enable();
      await activate(provider);
      const account = provider.accounts[0];
      if (!isReconnect) {
        sendWalletLogs(WALLET_CONNECT.title, 'evm', account, user);
      }
    } catch (error) {
      console.error(error);
    }
  }, [activate, user]);

  const connectExtension = useCallback(
    async (wallet: WalletMeta) => {
      try {
        const isReconnect = !!localStorage.getItem(CONNECTED_EVM_WALLET_KEY);
        const extension = resolvePath(window, wallet.ethereumProvider);

        if (!extension) {
          window.open(wallet.installUrl);
          return;
        }

        const provider = new providers.Web3Provider(extension, 'any');
        await provider.send('eth_requestAccounts', []);
        const account = await getEthereumAccount(provider);

        await activate(provider);
        if (!isReconnect) {
          localStorage.setItem(
            CONNECTED_EVM_WALLET_KEY,
            JSON.stringify(wallet),
          );
          sendWalletLogs(wallet.title, 'evm', account, user);
        }

        if (chainId !== network) {
          switchEthChain();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [activate, chainId, switchEthChain, user],
  );

  useEffect(() => {
    if (localStorage.getItem(WALLET_CONNECT_KEY)) {
      connectWC();
    }
    if (localStorage.getItem(CONNECTED_EVM_WALLET_KEY)) {
      connectExtension(getStoredEVMWallet());
    }
  }, []);

  const deactivate = useCallback(() => {
    disconnectBSC();
    cleanEVMStorage();
  }, [disconnectBSC]);

  return {
    disconnect: deactivate,
    connectInjected,
    connectWC,
    connectExtension,
    connected,
    account,
    chainId,
    switchEthChain,
    connectedWallet,
    balance,
    isLoading,
    isWrongNetwork,
    isMetamaskInstalled,
    isTalismanInstalled,
    isSubwalletInstalled,
    isCloverInstalled,
    isBinanceWalletInstalled,
    isOtherEvmWalletInstalled,
  };
};
