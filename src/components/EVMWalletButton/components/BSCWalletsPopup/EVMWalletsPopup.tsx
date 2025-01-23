import { useCallback } from 'react';

import { WalletsPopup } from '@/components/WalletsPopup/WalletsPopup';
import { WalletPopupItem } from '@/components/WalletsPopup/components/WalletPopupItem';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import {
  CLOVER_WALLET,
  METAMASK,
  SUB_WALLET,
  TALISMAN_WALLET,
  UNKNOWN_INJECTED_WALLET,
  WALLET_CONNECT,
} from '@/constants/wallets';

interface EVMWalletsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EVMWalletsPopup = ({ isOpen, onClose }: EVMWalletsPopupProps) => {
  const {
    connectInjected,
    connectWC,
    connectExtension,
    isMetamaskInstalled,
    isTalismanInstalled,
    isCloverInstalled,
    isSubwalletInstalled,
    isOtherEvmWalletInstalled,
  } = useConnectExtension();

  const onMetamaskConnect = useCallback(() => {
    if (isMetamaskInstalled) {
      connectInjected();
    } else {
      window.open(METAMASK.installUrl);
    }
    onClose();
  }, [connectInjected, isMetamaskInstalled, onClose]);

  const onInjectedConnect = useCallback(() => {
    connectInjected();
    onClose();
  }, [connectInjected, onClose]);

  const onTalismanConnect = useCallback(() => {
    connectExtension(TALISMAN_WALLET);
    onClose();
  }, [connectExtension, onClose]);

  const onSubwalletConnect = useCallback(() => {
    connectExtension(SUB_WALLET);
    onClose();
  }, [connectExtension, onClose]);

  const onCloverConnect = useCallback(() => {
    connectExtension(CLOVER_WALLET);
    onClose();
  }, [connectExtension, onClose]);

  const onWalletConnect = useCallback(() => {
    connectWC();
    onClose();
  }, [connectWC, onClose]);

  return (
    <WalletsPopup title="Connect wallet" isOpen={isOpen} onClose={onClose}>
      {isOtherEvmWalletInstalled && (
        <WalletPopupItem
          text="Your Ethereum Wallet"
          icon={UNKNOWN_INJECTED_WALLET.icon}
          onClick={onInjectedConnect}
        />
      )}
      <WalletPopupItem
        text={isMetamaskInstalled ? 'Metamask' : 'Install Metamask'}
        icon={METAMASK.icon}
        onClick={onMetamaskConnect}
      />
      <WalletPopupItem
        isComingSoon
        text={isTalismanInstalled ? 'Talisman' : 'Install Talisman'}
        icon={TALISMAN_WALLET.icon}
        onClick={onTalismanConnect}
      />
      <WalletPopupItem
        isComingSoon
        text={isSubwalletInstalled ? 'Subwallet' : 'Install Subwallet'}
        icon={SUB_WALLET.icon}
        onClick={onSubwalletConnect}
      />
      <WalletPopupItem
        isComingSoon
        text={isCloverInstalled ? 'Clover' : 'Install Clover'}
        icon={CLOVER_WALLET.icon}
        onClick={onCloverConnect}
      />
      <WalletPopupItem
        isComingSoon
        text="Wallet connect"
        icon={WALLET_CONNECT.icon}
        onClick={onWalletConnect}
      />
    </WalletsPopup>
  );
};
