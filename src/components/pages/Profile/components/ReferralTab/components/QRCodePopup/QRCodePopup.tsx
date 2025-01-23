import { Flex, Image, Modal } from '@chakra-ui/react';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Button } from '@/components/common/Button';
import QRCode from 'qrcode.react';
import { useCallback } from 'react';
import opensourcefunLogoIcon from '@/assets/opensourcefun_logo.svg';
import html2canvas from 'html2canvas';

interface QRCodePopupProps {
  link: string;
  isOpen: boolean;
  onClose: () => void;
}

const QRCODE_ID = 'qr-code';

export const QRCodePopup = ({ link, isOpen, onClose }: QRCodePopupProps) => {
  const downloadQRCode = useCallback(async () => {
    const qrWrapper = document.getElementById(QRCODE_ID);
    if (qrWrapper) {
      const canvas = await html2canvas(qrWrapper);
      const imageString = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageString;
      link.download = 'referral-code.png';
      link.click();
    }
  }, []);

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
          Referral QR Code
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody
          padding="16px 60px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Flex
            id={QRCODE_ID}
            width="300px"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E5E5E5"
            borderRadius="8px"
            padding="24px"
            flexDirection="column"
          >
            <QRCode value={link} size={250} />
            <Flex
              alignItems="center"
              justifyContent="center"
              marginTop="30px"
              color="#000"
              height="40px"
            >
              Referral
              <Image
                src={opensourcefunLogoIcon}
                width="40px"
                height="40px"
                margin="0 18px"
              />
              opensourcefun
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter
          padding="0 60px 56px"
          marginTop="32px"
          justifyContent="center"
        >
          <Button variant="primary" width="280px" onClick={downloadQRCode}>
            Download referral QR Code
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
