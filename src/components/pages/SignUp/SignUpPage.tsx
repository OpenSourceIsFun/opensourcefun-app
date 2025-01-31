import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { FormInput } from '@/components/common/FormInput/FormInput';
import { SignUpPageSchema } from '@/components/pages/SignUp/SignUpPage.schema';
import {
  API_REGISTER_ROUTE,
  AUTH_EMAIL_ROUTE,
  HOME_ROUTE,
} from '@/constants/routes';
import fetchJson from '@/services/fetchJson';
import useUser, { User } from '@/hooks/useUser';
import { sendMetricsCreateAccount } from '@/services/metrics';
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
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiOutlineMail } from 'react-icons/hi';
import { setToken } from '@/utils/auth';
import { PasswordTypes } from '@/components/common/PasswordControl/PasswordControl.constants';
import { PasswordControl } from '@/components/common/PasswordControl/PasswordControl';

export interface SignupFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  promocode: string;
  terms: boolean;
}

export const SignUpPage = () => {
  const { mutateUser } = useUser({
    redirectTo: HOME_ROUTE,
    redirectIfFound: true,
  });
  const formMethods = useForm<SignupFormInput>({
    resolver: yupResolver(SignUpPageSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState<PasswordTypes>(
    PasswordTypes.PASSWORD,
  );
  const router = useRouter();
  const { email, code } = router.query;

  const onSubmit: SubmitHandler<SignupFormInput> = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const referralCode = localStorage.getItem('referralCode');
        await mutateUser(
          (async () => {
            const token = await fetchJson<string>(API_REGISTER_ROUTE, {
              method: 'POST',
              body: JSON.stringify({
                password: data.password,
                email,
                code,
                referralCode,
              }),
            });

            setToken(token);

            sendMetricsCreateAccount();
          })() as unknown as Promise<User>,
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [code, email, mutateUser],
  );

  useEffect(() => {
    if (!email || !code) {
      router.push(AUTH_EMAIL_ROUTE);
    }
  }, [email, code]);

  return (
    <Grid
      maxWidth="560px"
      margin="73px auto 0"
      flexDirection="column"
      justifyContent="center"
      paddingBottom="25px"
      backgroundColor="background.light"
    >
      <Text
        fontWeight="600"
        fontSize="32px"
        lineHeight="44px"
        textAlign="center"
        width={['350px', '350px', 'auto']}
      >
        Create&nbsp;password
      </Text>
      <Text
        fontWeight="400"
        fontSize="16px"
        lineHeight="24px"
        opacity={0.64}
        textAlign="center"
        marginTop="11px"
      >
        Please, create password for your account
      </Text>
      <FormProvider {...formMethods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <FormInput
                isDisabled
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
          <PasswordControl
            name="password"
            text="Password"
            withRequirements
            control={control}
            error={errors.password}
            passwordType={passwordType}
            setPasswordType={setPasswordType}
          />
          <PasswordControl
            name="confirmPassword"
            text="Confirm password"
            control={control}
            error={errors.confirmPassword}
            passwordType={passwordType}
            setPasswordType={setPasswordType}
          />
          <Button
            variant="primary"
            type="submit"
            width="138px"
            alignSelf="flex-end"
            disabled={Object.keys(errors).length > 0}
          >
            {loading ? <Spinner /> : 'Save and start'}
          </Button>
        </StyledForm>
      </FormProvider>
    </Grid>
  );
};

const StyledForm = styled.form`
  margin: 65px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;

  @media (max-width: 450px) {
    padding: 0 20px;
  }

  @media (min-width: 750px) {
    width: 560px;
  }
`;
