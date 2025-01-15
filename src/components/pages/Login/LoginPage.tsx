import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { FormInput } from '@/components/common/FormInput/FormInput';
import fetchJson, { FetchError } from '@/services/fetchJson';
import useUser, { User } from '@/hooks/useUser';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Icon,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import {
  CodeLoginPageSchema,
  PasswordLoginPageSchema,
} from '@/components/pages/Login/LoginPage.schema';
import { EMAIL_ERROR_TYPES } from '@/components/pages/Login/LoginPage.constants';
import {
  API_LOGIN_ROUTE,
  API_SEND_CODE_ROUTE,
  AUTH_VERIFY_CODE_ROUTE,
  HOME_ROUTE,
} from '@/constants/routes';
import { ExceptionTypeEnum } from '@/constants/error';
import { HiOutlineMail } from 'react-icons/hi';
import styled from '@emotion/styled';
import { ApiSendCodeResponse } from '@/components/pages/AuthEmail/AuthEmailPage';
import {
  AUTH_EMAIL_TYPES,
  LOGIN_TYPES,
} from '@/components/pages/AuthEmail/AuthEmailPage.constants';
import { setToken } from '@/utils/auth';
import { PasswordControl } from '@/components/common/PasswordControl/PasswordControl';
import { PasswordTypes } from '@/components/common/PasswordControl/PasswordControl.constants';
import { useIsMobile } from '@/hooks/useIsMobile';

// TODO: server-side redirect from login page if user is already logged in

interface IFormInput {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const isMobile = useIsMobile();
  const [loginMode, setLoginMode] = useState<LOGIN_TYPES>(LOGIN_TYPES.PASSWORD);
  const formMethods = useForm<IFormInput>({
    resolver: yupResolver(
      loginMode === LOGIN_TYPES.PASSWORD
        ? PasswordLoginPageSchema
        : CodeLoginPageSchema,
    ),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = formMethods;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState<PasswordTypes>(
    PasswordTypes.PASSWORD,
  );
  const { email } = router.query;
  const { mutateUser } = useUser({
    redirectTo: HOME_ROUTE,
    redirectIfFound: true,
  });

  useEffect(() => {
    if (errors.email?.type === EMAIL_ERROR_TYPES.CUSTOM && !errors.password) {
      clearErrors();
    }
  }, [clearErrors, errors.email, errors.password]);

  const sendLoginCode = useCallback(
    async (email: string) => {
      try {
        setLoading(true);
        const { type } = await fetchJson<ApiSendCodeResponse>(
          API_SEND_CODE_ROUTE,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, isAuthorize: true }),
          },
        );

        if (type === AUTH_EMAIL_TYPES.SIGN_IN) {
          router.push(
            { pathname: AUTH_VERIFY_CODE_ROUTE, query: { email } },
            AUTH_VERIFY_CODE_ROUTE,
          );
        }
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    },
    [router],
  );

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      try {
        setLoading(true);

        if (loginMode === LOGIN_TYPES.PASSWORD) {
          await mutateUser(
            (async () => {
              const token = await fetchJson<string>(API_LOGIN_ROUTE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data }),
              });

              setToken(token);
            })() as unknown as Promise<User>,
          );
        } else {
          await sendLoginCode(data.email);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof FetchError) {
          switch (error.data.type) {
            case ExceptionTypeEnum.IncorrectEmailOrPassword:
              setError('email', {
                type: EMAIL_ERROR_TYPES.CUSTOM,
              });
              setError('password', {
                message: 'Incorrect email or password',
                type: EMAIL_ERROR_TYPES.VALIDATE,
              });
              break;
            // TODO: other errors handling
            // case '':
          }
        }
      }
    },
    [loginMode, mutateUser, sendLoginCode, setError],
  );

  const handleCodeLogin = useCallback(async () => {
    try {
      clearErrors();
      if (email) {
        await sendLoginCode(email as string);
      } else {
        setLoginMode(LOGIN_TYPES.CODE);
      }
    } catch (e) {
      console.error(e);
    }
  }, [clearErrors, email, sendLoginCode]);

  const handlePasswordLogin = useCallback(
    () => setLoginMode(LOGIN_TYPES.PASSWORD),
    [],
  );

  return (
    <Grid
      maxWidth="560px"
      margin="73px auto"
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
      >
        Log in
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
        Please, enter your password to log in
      </Text>
      <FormProvider {...formMethods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <FormInput
                isDisabled={!!email}
                hasRightElement
                defaultValue={email as string}
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
          {loginMode === LOGIN_TYPES.PASSWORD && (
            <PasswordControl
              control={control}
              name="password"
              text="Password"
              passwordType={passwordType}
              setPasswordType={setPasswordType}
              error={errors.password}
            />
          )}
          {loading ? (
            <Spinner alignSelf="center" />
          ) : (
            <Flex
              justifyContent="space-between"
              fontSize="14px"
              alignItems="center"
              gap="32px"
              width="100%"
              flexDirection={isMobile ? 'column-reverse' : 'row'}
            >
              <Flex width="100%">
                <Text whiteSpace="nowrap">Forgot password?</Text>{' '}
                <Url
                  onClick={
                    loginMode === LOGIN_TYPES.PASSWORD
                      ? handleCodeLogin
                      : handlePasswordLogin
                  }
                >
                  {loginMode === LOGIN_TYPES.PASSWORD
                    ? 'Login with code'
                    : 'Login with password'}
                </Url>
              </Flex>
              <Button
                variant="primary"
                type="submit"
                width="100%"
                disabled={Object.keys(errors).length > 0}
              >
                {loading ? <Spinner /> : 'Start'}
              </Button>
            </Flex>
          )}
        </StyledForm>
      </FormProvider>
    </Grid>
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

const StyledForm = styled.form`
  margin: 35px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
  width: 560px;

  @media (max-width: 570px) {
    width: 100%;
  }
`;
