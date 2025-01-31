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

interface RegistrationPopupProps {
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationPopup = (props: RegistrationPopupProps) => {
  const { isOpen, onClose, onConfirm } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={['100%', '100%', '600px']}>
        <ModalHeader
          color="#000"
          fontSize="24px"
          padding="16px"
          marginTop="32px"
          textAlign="center"
        >
          Smart contract action
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody
          padding="16px 60px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Image src="/images/contract_emoji.png" width="40px" height="40px" />
          <Text
            fontSize="24px"
            fontWeight={600}
            textAlign="center"
            paddingTop="32px"
          >
            Sign the transaction in your wallet. <br />
            You will need to pay the network fee.
            <br />
            <br />
            Your registration fee is 0.
          </Text>
        </ModalBody>
        <ModalFooter
          padding="0 60px 56px"
          marginTop="32px"
          justifyContent="center"
        >
          <Button variant="primary" width="86px" onClick={onConfirm}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
