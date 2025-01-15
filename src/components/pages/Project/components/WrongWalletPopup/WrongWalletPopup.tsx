import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Image, Modal, Text } from '@chakra-ui/react';
import { Button } from '@/components/common/Button';

interface WrongWalletPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WrongWalletPopup = (props: WrongWalletPopupProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent minWidth={['100%', '100%', '600px']}>
        <ModalHeader
          fontSize="24px"
          padding="16px"
          marginTop="32px"
          textAlign="center"
        >
          Wrong wallet
        </ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody
          padding="16px 60px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Image src="/images/skeptic_emoji.png" width="40px" height="40px" />
          <Text
            fontSize="24px"
            fontWeight={600}
            textAlign="center"
            paddingTop="32px"
          >
            Connect the wallet you have verified and use it to sign the
            transaction.
          </Text>
        </ModalBody>
        <ModalFooter
          padding="0 60px 56px"
          marginTop="32px"
          justifyContent="center"
        >
          <Button variant="primary" width="86px" onClick={props.onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
