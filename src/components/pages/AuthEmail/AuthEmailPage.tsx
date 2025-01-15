import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { FormInput } from '@/components/common/FormInput/FormInput';
import fetchJson from '@/services/fetchJson';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import {
  API_SEND_CODE_ROUTE,
  AUTH_VERIFY_CODE_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
} from '@/constants/routes';
import { HiOutlineMail } from 'react-icons/hi';
import { TermsCheckbox } from '@/components/pages/SignUp/components/TermsCheckbox/TermsCheckbox';
import { AuthEmailPageSchema } from '@/components/pages/AuthEmail/AuthEmailPage.schema';
import { AUTH_EMAIL_TYPES } from '@/components/pages/AuthEmail/AuthEmailPage.constants';
import styled from '@emotion/styled';
import Link from 'next/link';
import useUser from '@/hooks/useUser';
import { Loading } from '@/components/common/Loading/Loading';

// TODO: server-side redirect from login page if user is already logged in

interface AuthEmailFormInput {
  email: string;
  referralCode?: string;
  terms: boolean;
}

export interface ApiSendCodeResponse {
  type: AUTH_EMAIL_TYPES;
}

export const AuthEmailPage = () => {
  useUser({
    redirectTo: PROFILE_ROUTE,
    redirectIfFound: true,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthEmailFormInput>({
    resolver: yupResolver(AuthEmailPageSchema),
  });
  const router = useRouter();
  const { referralCode } = router.query;
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<AuthEmailFormInput> = useCallback(
    async ({ referralCode, ...data }) => {
      try {
        setLoading(true);
        if (referralCode) {
          localStorage.setItem('referralCode', referralCode);
        }
        const { type } = await fetchJson<ApiSendCodeResponse>(
          API_SEND_CODE_ROUTE,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.email, isAuthorize: false }),
          },
        );
        setLoading(false);
        if (type === AUTH_EMAIL_TYPES.SIGN_IN) {
          router.push(
            { pathname: LOGIN_ROUTE, query: { email: data.email } },
            LOGIN_ROUTE,
          );
        }
        if (type === AUTH_EMAIL_TYPES.SIGN_UP) {
          router.push(
            { pathname: AUTH_VERIFY_CODE_ROUTE, query: { email: data.email } },
            AUTH_VERIFY_CODE_ROUTE,
          );
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [router],
  );

  if (window.location.search.includes('referralCode') && !referralCode) {
    return (
      <Flex width="100%" justifyContent="center">
        <Loading />
      </Flex>
    );
  }

  return (
    <Flex width="100%" justifyContent="center">
      <Flex
        maxWidth="560px"
        margin="73px 20px 0"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingBottom="25px"
        backgroundColor="background.light"
      >
        <Text
          fontWeight="600"
          fontSize="32px"
          lineHeight="44px"
          color="#303030"
          textAlign="center"
          width={['350px', '350px', 'auto']}
        >
          Welcome to&nbsp;opensourcefun
        </Text>
        <Text
          fontWeight="400"
          fontSize="16px"
          lineHeight="24px"
          color="#303030"
          opacity={0.64}
          textAlign="center"
          marginTop="11px"
        >
          Please, use your current email. Your entry code will be sent to this
          address.
        </Text>
        <form
          style={{
            margin: '65px 0 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '32px',
            minWidth: '350px',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <FormInput
                hasRightElement
                fieldName="email"
                placeholder="mail@mail.com"
                control={control}
                hasError={!!errors.email}
              />
              <InputRightElement
                pointerEvents="none"
                width="55px"
                height="100%"
              >
                <Flex
                  height="21px"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon
                    as={HiOutlineMail}
                    height="21px"
                    width="21px"
                    color={errors.email ? 'error' : 'primary.basic'}
                  />
                </Flex>
              </InputRightElement>
            </InputGroup>
            {errors.email && (
              <FormErrorMessage
                fontWeight="400"
                fontSize="12px"
                lineHeight="18px"
                color="error"
              >
                {errors.email.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.referralCode}>
            <FormLabel htmlFor="referralCode">
              Referral Code (Optional)
            </FormLabel>
            <InputGroup>
              <FormInput
                hasRightElement
                fieldName="referralCode"
                defaultValue={referralCode as string}
                control={control}
                hasError={!!errors.referralCode}
              />
              <InputRightElement
                pointerEvents="none"
                width="55px"
                height="100%"
              >
                <Flex
                  height="21px"
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon
                    as={HiOutlineMail}
                    height="21px"
                    width="21px"
                    color={errors.referralCode ? 'error' : 'primary.basic'}
                  />
                </Flex>
              </InputRightElement>
            </InputGroup>
            {errors.referralCode && (
              <FormErrorMessage
                fontWeight="400"
                fontSize="12px"
                lineHeight="18px"
                color="error"
              >
                {errors.referralCode.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <Flex
            justifyContent="space-between"
            width="100%"
            flexDirection={['column', 'column', 'row']}
            gap="32px"
          >
            <TermsCheckbox control={control} errors={errors.terms} />
            <Button
              variant="primary"
              type="submit"
              flexShrink={0}
              width={['100%', '100%', '215px']}
              disabled={Object.keys(errors).length > 0}
            >
              {loading ? <Spinner /> : 'Continue'}
            </Button>
          </Flex>
        </form>

        <Flex
          position="absolute"
          top={['700px', '700px', '650px']}
          left="calc(50% - 150px)"
        >
          You can also{' '}
          <Link href={LOGIN_ROUTE}>
            <Url>continue with password</Url>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
const Url = styled.span`
  text-decoration: underline;
  color: var(--chakra-colors-accent-blue);
  cursor: pointer;
  white-space: nowrap;
  margin-left: 5px;
  transition: transform 300ms;

  &:hover {
    text-decoration: none;
    color: #5cbaec;
  }
`;
