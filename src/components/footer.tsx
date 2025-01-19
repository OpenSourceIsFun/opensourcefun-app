import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  IconButton,
  Image,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';
import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { GoogleDocsViewer } from '@/components/GoogleDocsViewer/GoogleDocsViewer';
import {
  PRIVACY_LINK,
  TERMS_LINK,
} from '@/components/GoogleDocsViewer/GoogleDocsViewer.constants';
import githubIcon from '@/assets/github.svg';
import opensourcefunLogoLightIcon from '@/assets/opensourcefun_logo_light.svg';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { FormInput } from './common/FormInput/FormInput';
import fetchJson from '@/services/fetchJson';
import { API_EMAIL_SUBSCRIBE_ROUTE } from '@/constants/routes';
import toast from 'react-hot-toast';

interface FormData {
  email: string;
}

const schema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
  })
  .required();

export const Footer = () => {
  const [loading, setLoading] = useState(false);
  const {
    control: formControl,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
    try {
      setLoading(true);
      await fetchJson(API_EMAIL_SUBSCRIBE_ROUTE, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      toast.success('You have successfully subscribed to our newsletter');
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return (
    <StyledContainer as="footer" role="contentinfo">
      <Grid
        justifyContent="space-between"
        padding={[
          '56px 40px',
          '56px 40px',
          '56px 40px',
          '56px 40px',
          '56px 140px',
        ]}
        columnGap="72px"
        gridTemplateColumns={['1fr', '1fr', 'auto 350px']}
      >
        <Flex alignItems="flex-start">
          <Flex alignItems="center" marginBottom="40px">
            <Image
              src={opensourcefunLogoLightIcon}
              alt="opensourcefun"
              height="32px"
            />
            <Text color="footer.light" marginLeft="12px" fontWeight={900}>
              Powered by opensourcefun
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          marginBottom="-15px"
          position="relative"
          maxWidth="340px"
          alignItems={['flex-start', 'flex-start', 'flex-end']}
        >
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email}>
              <InputGroup border="rgba(255, 255, 255, 0.12)">
                <FormInput
                  hasRightElement
                  fieldName="email"
                  backgroundColor="background.dark"
                  border="1px solid rgba(255, 255, 255, 0.12)"
                  borderRadius="12px"
                  placeholder="E-mail"
                  color="secondary.basic"
                  _placeholder={{ color: '#fff' }}
                  control={formControl}
                  hasError={!!errors.email}
                  width={['100%', '340px']}
                  height="56px"
                  onBlur={() => clearErrors()}
                />
                <InputRightElement top="8px" right="48px">
                  <SubscribeButton variant="primary" type="submit">
                    {loading ? <Spinner /> : 'Subscribe'}
                  </SubscribeButton>
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
            <Flex justifyContent="flex-end"></Flex>
          </StyledForm>
          <ButtonGroup
            variant="ghost"
            marginTop="24px"
            gap="8px"
            justifyContent={['flex-start', 'flex-start', 'flex-end']}
          >
            <StyledIconButton
              as="a"
              href="https://t.me/OpenSourceIsFun"
              target="_blank"
              aria-label="Telegram"
              icon={<FaTelegramPlane fontSize="1.25rem" fill="#303030" />}
            />
            <StyledIconButton
              as="a"
              href="https://x.com/opensourceisfun"
              target="_blank"
              aria-label="XCom"
              icon={<FaTwitter fontSize="1.25rem" fill="#303030" />}
            />
            <StyledIconButton
              as="a"
              aria-label="GitHub"
              target="_blank"
              href="https://github.com/OpenSourceIsFun"
              icon={<Image src={githubIcon} />}
            />
          </ButtonGroup>
        </Flex>
        <Flex
          alignItems="flex-start"
          marginTop={['80px', '80px', '0']}
          gap={['10px', '10px', '10px', '63px']}
          flexDirection={[
            'column-reverse',
            'column-reverse',
            'column-reverse',
            'row',
          ]}
        >
          <Flex align="start">
            <Text fontSize="sm" color="footer.dark">
              &copy;&nbsp;{new Date().getFullYear()}
              &nbsp;All&nbsp;Rights&nbsp;Reserved
            </Text>
          </Flex>
          <GoogleDocsViewer
            title="Terms and Service"
            fileUrl={TERMS_LINK}
            control={(props) => (
              <Button
                {...props}
                variant="link"
                as="a"
                fontSize="sm"
                color="footer.dark"
                cursor="pointer"
              >
                Terms and Service
              </Button>
            )}
          />
          <GoogleDocsViewer
            title="Privacy Policy"
            fileUrl={PRIVACY_LINK}
            control={(props) => (
              <Button
                {...props}
                variant="link"
                as="a"
                fontSize="sm"
                color="footer.dark"
                cursor="pointer"
              >
                Privacy Policy
              </Button>
            )}
          />
        </Flex>
      </Grid>
    </StyledContainer>
  );
};

const StyledForm = styled('form')`
  width: 100%;
`;

const StyledContainer = styled(Container)`
  background: var(--chakra-colors-footer-background);
  max-width: 100%;
  padding: 0 0 30px;
`;

const SubscribeButton = styled(Button)`
  background: var(--chakra-colors-secondary-basic);
  color: var(--chakra-colors-secondary-text);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  padding: 12px 24px;
  width: 129px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;

  &:hover {
    background: var(--chakra-colors-background-gray);
  }
`;

const StyledIconButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #fff;

  svg {
    color: white;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const FooterWrapper = styled.div`
  width: 100%;
  @media screen and (min-width: 48em) {
    margin-top: 0;
  }
`;
