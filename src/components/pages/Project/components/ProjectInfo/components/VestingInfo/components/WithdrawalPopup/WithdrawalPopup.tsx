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

interface WithdrawalPopupProps {
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawalPopup = (props: WithdrawalPopupProps) => {
  const { isOpen, onClose, onConfirm } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={['100%', '100%', '600px']}>
        <ModalHeader
          fontSize="24px"
          padding="16px"
          marginTop="32px"
          textAlign="center"
        >
          Claim alert
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody
          padding="16px 60px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Image src="/images/rock_emoji.png" width="40px" height="40px" />
          <Text
            fontSize="24px"
            fontWeight={600}
            textAlign="center"
            paddingTop="32px"
          >
            Claim is only available once <br />
            If you claim now, you will not be able to receive the rest of your
            allocation
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
