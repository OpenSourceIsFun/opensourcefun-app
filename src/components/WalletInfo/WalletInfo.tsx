import { useCallback } from 'react';
import { Flex, Image, Modal, Text } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { Button } from '@/components/common/Button';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { BigNumber } from 'ethers';
import { shortenPolkaAddress } from '@/utils/wallets';
import { useWithWidth } from '@/hooks/useWithWidth';
import { FiCopy } from 'react-icons/fi';
import viewIcon from '@/assets/view_icon.svg';
import { Astar } from '@/providers/dApp';

interface WalletsInfoProps {
  isOpen: boolean;
  isPolka?: boolean;
  account: string;
  balance: BigNumber | string;
  walletName: string;
  walletIcon: string;
  onDisconnect: () => void;
  onClose: () => void;
}

export const WalletsInfo = (props: WalletsInfoProps) => {
  const width = useWithWidth();
  const {
    account,
    balance,
    walletName,
    walletIcon,
    isPolka,
    isOpen,
    onDisconnect,
    onClose,
  } = props;

  const onCopyAddress = useCallback(() => {
    account && navigator.clipboard.writeText(account);
    toast.success('Address copied');
  }, [account]);

  const onOpenInView = useCallback(() => {
    window.open(Astar.getExplorerAddressLink(account));
  }, [account]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minWidth={['100%', '100%', '600px']}
        padding={['0 8px', '0 8px', '0 20px']}
        overflowX="hidden"
        backgroundColor="background.light"
      >
        <ModalHeader
          color="#000"
          fontSize="24px"
          fontFamily="Poppins"
          fontWeight={700}
          paddingLeft={['16px', '16px', '40px']}
          marginTop="32px"
        >
          Account
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody padding={['0 16px', '0 16px', '0 36px']} marginTop="8px">
          <Flex
            gap="16px"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Flex justifyContent="space-between">
              <Text
                fontFamily="Poppins"
                fontSize="14px"
                color="secondary.textLight"
              >
                Balance
              </Text>
              <Text
                fontFamily="Poppins"
                fontSize="16px"
                fontWeight={500}
                color="secondary.text"
              >
                {`${balance}`} ASTR
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text
                fontFamily="Poppins"
                fontSize="14px"
                color="secondary.textLight"
              >
                Network
              </Text>
              <Text
                fontFamily="Poppins"
                fontSize="16px"
                fontWeight={500}
                color="secondary.text"
              >
                {isPolka ? 'Gear Testnet' : 'Astar'}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text
                fontFamily="Poppins"
                fontSize="14px"
                color="secondary.textLight"
              >
                Wallet
              </Text>
              <Text
                fontFamily="Poppins"
                fontSize="16px"
                fontWeight={500}
                color="secondary.text"
              >
                {walletName}
              </Text>
            </Flex>
          </Flex>
          <Flex
            margin="10px -56px 0"
            padding={['16px 54px', '32px 50px']}
            alignItems="center"
          >
            <Flex
              fontFamily="Poppins"
              fontWeight={600}
              width="100%"
              backgroundColor="#fff"
              borderRadius="12px"
              marginRight="10px"
              fontSize="16px"
              alignItems="center"
              padding="16px"
            >
              <Image
                margin="0px 14px 0px 11px"
                src={walletIcon}
                alt="bsc"
                width="24px"
                height="24px"
              />
              {account && shortenPolkaAddress(account, 6, width)}
            </Flex>
            <Button
              width="111px"
              height="40px"
              padding="14px 0"
              fontSize="14px"
              variant="primary"
              flexShrink={0}
              position="absolute"
              right={['36px', '36px', '70px']}
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter
          justifyContent="space-between"
          alignItems="flex-start"
          gap="10px"
          padding={['20px 16px', '0 32px 50px']}
        >
          <Button
            variant="secondary"
            fontSize="12px"
            fontWeight={700}
            fontFamily="Poppins"
            alignItems="center"
            cursor="pointer"
            _hover={{ color: 'primary.basic' }}
            onClick={onCopyAddress}
            borderRadius="8px"
          >
            Copy
            <Image as={FiCopy} width="20px" height="20px" />
          </Button>
          <Button
            variant="secondary"
            fontSize="12px"
            fontWeight={700}
            fontFamily="Poppins"
            display="flex"
            alignItems="center"
            borderRadius="8px"
            _hover={{ color: 'primary.basic' }}
            onClick={onOpenInView}
            isExternal
          >
            View
            <Image src={viewIcon} />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
