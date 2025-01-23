import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Flex, Image, Text } from '@chakra-ui/react';
import { GoogleDocsViewer } from '@/components/GoogleDocsViewer/GoogleDocsViewer';
import styled from '@emotion/styled';
import walletNetworkIcon from '@/assets/wallet_network.svg';
import { TERMS_LINK } from '@/components/GoogleDocsViewer/GoogleDocsViewer.constants';
import Link from 'next/link';
import { METAMASK } from '@/constants/wallets';
import { Button } from '@/components/common/Button';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { useCallback } from 'react';

interface ChangeWalletConnectNetworkProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeWalletConnectNetwork = ({
  isOpen,
  onClose,
}: ChangeWalletConnectNetworkProps) => {
  const { disconnect } = useConnectExtension();

  const onDisconnect = useCallback(() => {
    disconnect();
    onClose();
  }, [disconnect, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={['100%', '500px']}>
        <ModalHeader
          color="#000"
          fontSize="24px"
          paddingLeft={['24px', '60px']}
          marginTop="32px"
        >
          <Flex alignItems="center">
            <Flex
              borderRadius="50%"
              backgroundColor="kycIcons"
              width="56px"
              height="56px"
              justifyContent="center"
              alignItems="center"
              marginRight="20px"
            >
              <Image src={walletNetworkIcon} width="30px" height="32px" />
            </Flex>
            Change Network
          </Flex>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody padding={['16px 24px', '16px 60px']}>
          <Text fontFamily="Poppins" fontSize="14px" color="secondary.text">
            Please open the wallet app you have connected and switch network to
            Shibuya Testnet.
            <br />
            <br />
            If your wallet doesn&apos;t support adding custom networks, please
            use&nbsp;
            <Link href={METAMASK.installUrl}>
              <MetamaskUrl>Metamask</MetamaskUrl>
            </Link>
            .
            <br />
            <br />
            Once the network is switched, the wallet would be reconnected
            automatically.
          </Text>
        </ModalBody>
        <ModalFooter
          padding={['20px 24px', '20px 60px']}
          marginTop="32px"
          borderTop="1px solid var(--chakra-colors-secondary-textLight)"
          justifyContent="flex-start"
          gap="50px"
        >
          <Text
            fontFamily="Poppins"
            fontSize="12px"
            fontWeight={500}
            color="secondary.textLight"
          >
            By connecting, I accept opensourcefun&apos;s{' '}
            <GoogleDocsViewer
              title="Terms and Service"
              fileUrl={TERMS_LINK}
              control={(props) => <DocUrl {...props}>Terms of Service</DocUrl>}
            />
            .
          </Text>
          <Button variant="primary" onClick={onDisconnect} width="160px">
            Disconnect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const DocUrl = styled.span`
  color: var(--chakra-colors-secondary-text);
  cursor: pointer;
`;

const MetamaskUrl = styled.span`
  font-weight: 600;
  text-decoration: underline;
`;
