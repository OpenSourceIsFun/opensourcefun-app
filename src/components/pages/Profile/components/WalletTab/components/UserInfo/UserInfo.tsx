import {
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  InputGroup,
  InputLeftElement,
  Spinner,
} from '@chakra-ui/react';
import { FormInput } from '@/components/common/FormInput/FormInput';
import { Button } from '@/components/common/Button';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import fetchJson from '@/services/fetchJson';
import { API_USER_INFO_ROUTE } from '@/constants/routes';
import useUser from '@/hooks/useUser';
import { BsTwitter } from 'react-icons/bs';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

export interface UserInfoFormInput {
  telegram: string;
  discord: string;
  twitter: string;
}

export const UserInfo = () => {
  const { user, mutateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<UserInfoFormInput>();

  const onSubmit: SubmitHandler<UserInfoFormInput> = useCallback(
    async (data) => {
      try {
        setLoading(true);
        await fetchJson<string>(API_USER_INFO_ROUTE, {
          method: 'PUT',
          body: JSON.stringify(data),
        });
        await mutateUser();
        toast.success('Information updated!');
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [mutateUser],
  );

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Heading fontSize="25px" fontWeight={600}>
        Contacts
      </Heading>
      <FormControl isInvalid={!!errors.telegram}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" width="55px" height="100%">
            <Flex
              height="21px"
              width="100%"
              justifyContent="center"
              alignItems="center"
              borderRight="1px solid #E0E0E0"
            >
              <BlackCircle>
                <Icon as={FaTelegramPlane} width="14px" fill="white" />
              </BlackCircle>
            </Flex>
          </InputLeftElement>
          <FormInput
            defaultValue={user?.telegram}
            fieldName="telegram"
            placeholder="Enter your Telegram"
            control={control}
          />
        </InputGroup>
        {errors.telegram && (
          <FormErrorMessage
            fontWeight="400"
            fontSize="12px"
            lineHeight="18px"
            color="error"
          >
            {errors.telegram.message}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.discord}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" width="55px" height="100%">
            <Flex
              height="21px"
              width="100%"
              justifyContent="center"
              alignItems="center"
              borderRight="1px solid #E0E0E0"
            >
              <BlackCircle>
                <Icon as={FaDiscord} width="14px" fill="white" />
              </BlackCircle>
            </Flex>
          </InputLeftElement>
          <FormInput
            defaultValue={user?.discord}
            fieldName="discord"
            placeholder="Enter your Discord"
            control={control}
          />
        </InputGroup>
        {errors.discord && (
          <FormErrorMessage
            fontWeight="400"
            fontSize="12px"
            lineHeight="18px"
            color="error"
          >
            {errors.discord.message}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.twitter}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" width="55px" height="100%">
            <Flex
              height="32px"
              width="100%"
              justifyContent="center"
              alignItems="center"
              borderRight="1px solid #E0E0E0"
            >
              <BlackCircle>
                <Icon as={BsTwitter} width="14px" fill="white" />
              </BlackCircle>
            </Flex>
          </InputLeftElement>
          <FormInput
            defaultValue={user?.twitter}
            fieldName="twitter"
            placeholder="Enter your Twitter"
            control={control}
          />
        </InputGroup>
        {errors.twitter && (
          <FormErrorMessage
            fontWeight="400"
            fontSize="12px"
            lineHeight="18px"
            color="error"
          >
            {errors.twitter.message}
          </FormErrorMessage>
        )}
      </FormControl>

      <Button
        variant="primary"
        type="submit"
        width="138px"
        alignSelf="flex-end"
        disabled={
          Object.keys(errors).length || !Object.keys(dirtyFields).length
        }
      >
        {loading ? <Spinner /> : 'Save'}
      </Button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  margin: 35px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
  width: 100%;

  @media (max-width: 450px) {
    padding: 0 20px;
  }
`;

const BlackCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: var(--chakra-colors-background-dark);
  border-radius: 100%;
`;
