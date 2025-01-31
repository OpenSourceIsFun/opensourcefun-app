import { formatEther } from 'ethers/lib/utils';
import { BigNumber, providers } from 'ethers';
import { resolvePath } from '@/utils/common';
import {
  BINANCE_WALLET,
  CLOVER_WALLET,
  METAMASK,
  SUB_WALLET,
  TALISMAN_WALLET,
  UNKNOWN_INJECTED_WALLET,
  WALLET_CONNECT,
  WalletMeta,
} from '@/constants/wallets';
import {
  CONNECTED_EVM_WALLET_KEY,
  CONNECTED_POLKA_WALLET_KEY,
  WALLET_CONNECT_DEEPLINK_KEY,
  WALLET_CONNECT_KEY,
} from '@/constants/localStorage';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { IClientMeta } from '@walletconnect/types';

interface EthereumProvider extends providers.JsonRpcProvider {
  provider?: {
    isMetaMask?: boolean;
    isTalisman?: boolean;
    isSubWallet?: boolean;
    isClover?: boolean;
    isWalletConnect?: boolean;
    bnbSign: (data: string) => Promise<string>;
  };
}

export async function getEthereumAccount(provider?: providers.Web3Provider) {
  try {
    return await provider?.getSigner().getAddress();
  } catch (err: any) {
    if (err.code === 'UNSUPPORTED_OPERATION') {
      return undefined;
    }
    throw err;
  }
}

const getRateByWidth = (width: number) => {
  return width > 480 ? 12 : width < 400 ? 5 : width / 55;
};

export const shortenPolkaAddress = (
  address: string,
  rate = 6,
  width?: number,
) => {
  if (!address || address.length === 0) return '';
  const sliceRate = width ? getRateByWidth(width) : rate;
  const start = address.slice(0, sliceRate);
  const end = address.slice(address.length - sliceRate);
  return `${start}...${end}`;
};

export const formatEtherBalance = (balance?: BigNumber | string) =>
  balance ? parseFloat(formatEther(balance)).toFixed(2) : '';

export const getTalismanProvider = () => {
  return resolvePath(window, TALISMAN_WALLET.ethereumProvider);
};

export const getSubWalletProvider = () => {
  return resolvePath(window, SUB_WALLET.ethereumProvider);
};

export const getCloverProvider = () => {
  return resolvePath(window, CLOVER_WALLET.ethereumProvider);
};

export const getBinanceWalletProvider = () => {
  return resolvePath(window, BINANCE_WALLET.ethereumProvider);
};

const getWalletConnectMeta = (meta: IClientMeta): WalletMeta => {
  return {
    ...WALLET_CONNECT,
    title: meta.name ? meta.name : WALLET_CONNECT.title,
    icon: meta.icons[0] ? meta.icons[0] : WALLET_CONNECT.icon,
  };
};

export const getConnectedEVMWallet = (library?: EthereumProvider) => {
  const provider = library?.provider;

  if (provider?.isMetaMask) {
    return METAMASK;
  }

  if (provider?.isTalisman) {
    return TALISMAN_WALLET;
  }

  if (provider?.isClover) {
    return CLOVER_WALLET;
  }

  if (provider?.isSubWallet) {
    return SUB_WALLET;
  }

  if (provider?.bnbSign) {
    return BINANCE_WALLET;
  }

  if (provider?.isWalletConnect) {
    const providerMeta = (provider as unknown as WalletConnectProvider)
      .walletMeta;
    return providerMeta ? getWalletConnectMeta(providerMeta) : WALLET_CONNECT;
  }

  return UNKNOWN_INJECTED_WALLET;
};

export const getStoredEVMWallet = () => {
  const connectedWallet = localStorage.getItem(CONNECTED_EVM_WALLET_KEY);
  return connectedWallet ? JSON.parse(connectedWallet) : null;
};

export const cleanEVMStorage = () => {
  localStorage.removeItem(WALLET_CONNECT_KEY);
  localStorage.removeItem(WALLET_CONNECT_DEEPLINK_KEY);
  localStorage.removeItem(CONNECTED_EVM_WALLET_KEY);
};

export const cleanPolkaStorage = () => {
  localStorage.removeItem(CONNECTED_POLKA_WALLET_KEY);
};

export const cleanWalletsStorage = () => {
  cleanEVMStorage();
  cleanPolkaStorage();
};
