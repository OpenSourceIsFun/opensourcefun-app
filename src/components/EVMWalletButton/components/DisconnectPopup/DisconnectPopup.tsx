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
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { useCallback } from 'react';

interface DisconnectPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisconnectPopup = (props: DisconnectPopupProps) => {
  const { disconnect } = useConnectExtension();
  const { isOpen, onClose } = props;

  const onConfirm = useCallback(() => {
    onClose();
    disconnect();
  }, [disconnect, onClose]);

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
          Disconnect wallet?
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
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
            Your wallet is connecting
            <br />
            <br />
            Are sure you want to cancel?
          </Text>
        </ModalBody>
        <ModalFooter
          padding="0 60px 56px"
          marginTop="32px"
          justifyContent="center"
        >
          <Button variant="primary" width="120px" onClick={onConfirm}>
            Disconnect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
