import {
  Flex,
  Heading,
  Icon,
  Image,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { API_GET_REFERRAL_CODE } from '@/constants/routes';
import { FormInput } from '@/components/common/FormInput/FormInput';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';
import fetchJson from '@/services/fetchJson';
import { useDisclosure } from '@chakra-ui/hooks';
import { QRCodePopup } from '@/components/pages/Profile/components/ReferralTab/components/QRCodePopup/QRCodePopup';
import { ReferralsTable } from '@/components/pages/Profile/components/ReferralTab/components/ReferralsTable/ReferralsTable';

interface ReferralCode {
  createdAt: string;
  description: null;
  id: string;
  userId: string;
  value: string;
}

export const ReferralTab = () => {
  const [code, setCode] = useState('');
  const [link, setLink] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateReferralCode = useCallback(async () => {
    const response = await fetchJson<ReferralCode>(API_GET_REFERRAL_CODE);
    console.info(response, '[response]');
    setCode(response.value);
    setLink(
      `${window.location.origin}/auth/email?referralCode=${response.value}`,
    );
  }, []);

  useEffect(() => {
    updateReferralCode();
  }, []);

  const onCopyReferralCode = useCallback(() => {
    code && navigator.clipboard.writeText(code);
    toast.success('Referral code copied');
  }, [code]);

  const onCopyReferralLink = useCallback(() => {
    link && navigator.clipboard.writeText(link);
    toast.success('Referral link copied');
  }, [link]);

  return (
    <Flex
      flexBasis="100%"
      as="form"
      flexDirection="column"
      gap="8px"
      key="details"
      minHeight="366px"
      marginBottom="102px"
    >
      <Flex
        flexDirection="column"
        backgroundColor="#fff"
        borderRadius="8px"
        padding="24px"
        width="100%"
      >
        <Flex width="100%" marginBottom="30px">
          <Heading fontSize="25px" fontWeight={600}>
            Invite friends now!
          </Heading>
        </Flex>
        <Image src="/images/referral.png" />
        <Flex
          marginTop="40px"
          gap="8px"
          flexDirection={['column', 'column', 'column', 'column', 'row']}
        >
          <Flex flexDirection="column" width="100%">
            <Text fontSize="16px" fontWeight={500} marginTop="20px">
              Your referral link
            </Text>
            <InputGroup marginTop="16px">
              <FormInput
                isDisabled
                hasRightElement
                border="1px solid #EBEBEB"
                borderRadius="8px"
                paddingRight="45px"
                textOverflow="ellipsis"
                value={link}
              />
              <InputRightElement
                width="55px"
                height="100%"
                onClick={onCopyReferralLink}
              >
                <Flex
                  height="21px"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button variant="transparent">
                    <Icon as={FiCopy} height="21px" width="21px" />
                  </Button>
                </Flex>
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize="16px" fontWeight={500} marginTop="20px">
              Referral code
            </Text>
            <InputGroup marginTop="16px">
              <FormInput
                isDisabled
                hasRightElement
                border="1px solid #EBEBEB"
                borderRadius="8px"
                value={code}
              />
              <InputRightElement
                width="55px"
                height="100%"
                onClick={onCopyReferralCode}
              >
                <Flex
                  height="21px"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button variant="transparent">
                    <Icon as={FiCopy} height="21px" width="21px" />
                  </Button>
                </Flex>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Flex>
        <Button
          alignSelf="flex-end"
          width="220px"
          marginTop="20px"
          fontWeight="500"
          variant="primary"
          onClick={onOpen}
        >
          Download QR Code
        </Button>
        <QRCodePopup link={link} isOpen={isOpen} onClose={onClose} />
      </Flex>
      <ReferralsTable />
    </Flex>
  );
};
