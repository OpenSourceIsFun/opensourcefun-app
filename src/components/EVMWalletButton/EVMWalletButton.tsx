import { useCallback, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { WalletsInfo } from '@/components/WalletInfo/WalletInfo';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex, Image, Spinner } from '@chakra-ui/react';
import { ChangeWalletConnectNetwork } from '@/components/EVMWalletButton/components/ChangeWalletConnectNetwork/ChangeWalletConnectNetwork';
import { EVMWalletsPopup } from '@/components/EVMWalletButton/components/BSCWalletsPopup/EVMWalletsPopup';
import { formatEtherBalance } from '@/utils/wallets';
import { useIsMobile } from '@/hooks/useIsMobile';
import { WALLET_CONNECT } from '@/constants/wallets';
import { DisconnectPopup } from '@/components/EVMWalletButton/components/DisconnectPopup/DisconnectPopup';

interface EVMWalletButtonProps {
  control?: React.FC<{ onClick: () => void }>;
}

export const EVMWalletButton = (props: EVMWalletButtonProps) => {
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPopupOpen,
    onOpen: onPopupOpen,
    onClose: onPopupClose,
  } = useDisclosure();
  const {
    isOpen: isInfoOpen,
    onOpen: onInfoOpen,
    onClose: onInfoClose,
  } = useDisclosure();
  const {
    isOpen: isChangeNetworkOpen,
    onOpen: onChangeNetworkOpen,
    onClose: onChangeNetworkClose,
  } = useDisclosure();

  const {
    balance,
    connected,
    account,
    disconnect,
    switchEthChain,
    connectWC,
    connectedWallet,
    isWrongNetwork,
  } = useConnectExtension();

  const formattedBalance = formatEtherBalance(balance);

  const onConnect = useCallback(() => {
    if (isMobile) {
      connectWC();
    } else {
      onPopupOpen();
    }
  }, [connectWC, isMobile, onPopupOpen]);

  const onDisconnect = useCallback(() => {
    disconnect();
    onInfoClose();
  }, [disconnect, onInfoClose]);

  const onChangeNetwork = useCallback(() => {
    if (connectedWallet.extensionName === WALLET_CONNECT.extensionName) {
      onChangeNetworkOpen();
    }
    switchEthChain();
  }, [onChangeNetworkOpen, switchEthChain, connectedWallet]);

  useEffect(() => {
    if (!isWrongNetwork && isChangeNetworkOpen) {
      onChangeNetworkClose();
    }
  }, [isChangeNetworkOpen, isWrongNetwork, onChangeNetworkClose]);

  return (
    <>
      {connected && account && !isWrongNetwork && (
        <Button
          onClick={onInfoOpen}
          variant="transparent"
          width={formattedBalance ? 'auto' : '90px'}
          minWidth={formattedBalance ? '108px' : '90px'}
          padding="0"
          iconGap="10px"
          iconPlacement="left"
          fontSize="16px"
          flexShrink={0}
          icon={
            <Image
              src="/images/logos/solana_logo.png"
              alt="BSC"
              width="29px"
              height="29px"
            />
          }
        >
          {formattedBalance ? (
            `${formattedBalance} ASTR`
          ) : (
            <Flex width="80px" justifyContent="center">
              <Spinner width="24px" height="24px" onClick={onOpen} />
            </Flex>
          )}
        </Button>
      )}
      {account && isWrongNetwork && (
        <Button
          onClick={onChangeNetwork}
          variant="transparent"
          width="auto"
          minWidth="160px"
          flexShrink={0}
          iconGap="10px"
          color="error"
          padding="0"
          fontSize="16px"
          iconPlacement="left"
          icon={
            !props.control ? (
              <Image
                src="/images/logos/solana_logo.png"
                alt="BSC"
                width="29px"
                height="29px"
              />
            ) : undefined
          }
        >
          Wrong network
        </Button>
      )}
      {!account && !props.control && (
        <Button
          onClick={onConnect}
          variant="transparent"
          width="auto"
          minWidth="108px"
          flexShrink={0}
          iconGap="10px"
          fontSize="16px"
          iconPlacement="left"
          padding="0"
          icon={
            <Image
              src="/images/logos/solana_logo.png"
              alt="BSC"
              width="29px"
              height="29px"
            />
          }
        >
          Connect
        </Button>
      )}
      {!account && props.control && <props.control onClick={onConnect} />}
      <EVMWalletsPopup isOpen={isPopupOpen} onClose={onPopupClose} />
      {account && formattedBalance && (
        <WalletsInfo
          isOpen={isInfoOpen}
          account={account}
          walletName={connectedWallet.title}
          walletIcon={connectedWallet.icon}
          balance={formattedBalance}
          onClose={onInfoClose}
          onDisconnect={onDisconnect}
        />
      )}
      <ChangeWalletConnectNetwork
        isOpen={isChangeNetworkOpen}
        onClose={onChangeNetworkClose}
      />
      <DisconnectPopup isOpen={isOpen} onClose={onClose} />
    </>
  );
};
