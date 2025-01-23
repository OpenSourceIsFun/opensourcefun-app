import styled from '@emotion/styled';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Footer, FooterWrapper } from '@/components/footer';
import { ProjectsList } from '@/components/pages/Main/components/ProjectsList/ProjectsList';
import { Loading } from '@/components/common/Loading/Loading';
import { useRouter } from 'next/router';
import { HOME_ROUTE } from '@/constants/routes';
import { useIsMobile } from '@/hooks/useIsMobile';

export const FundPage = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (location.pathname !== '/ai-agents') {
    router.push(HOME_ROUTE);
    return <Loading />;
  }

  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="#000"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          padding={['56px 16px 280px', '76px 16px 280px', '76px 115px 119px']}
          backgroundImage="/images/backgrounds/ai-agents.jpg"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          flexDirection="column"
          maxWidth="1440px"
          height="100%"
          width="100%"
        >
          <Flex alignItems="center" marginBottom="16px">
            <Image
              src="/images/funds/ai-agents.png"
              width="96px"
              height="96px"
              marginRight="8px"
            />
          </Flex>
          <Heading
            marginBottom="16px"
            color="#fff"
            fontSize={['48px', '48px', '64px']}
          >
            Ai Agents
          </Heading>

          <HeaderFlex flexDirection="column">
            <BannerText>Base, Solana, Sonic.</BannerText>
          </HeaderFlex>
          <HeaderFlex
            gap="32px"
            marginTop="64px"
            flexDirection={isMobile ? 'column' : 'row'}
          >
            <BannerFlex>
              <BannerNumber>10</BannerNumber>
              <BannerText>Funds live</BannerText>
            </BannerFlex>
            <BannerFlex>
              <BannerNumber>$200k</BannerNumber>
              <BannerText>Funds Locked</BannerText>
            </BannerFlex>
          </HeaderFlex>
        </Flex>
      </Flex>
      <ProjectsList />
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Flex>
  );
};

const BannerFlex = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
`;

const BannerNumber = styled(Text)`
  color: var(--chakra-colors-primary-text);
  font-size: 24px;
  line-height: 36px;
  font-weight: 600;
`;

const BannerText = styled(Text)`
  font-size: 14px;
  color: var(--chakra-colors-primary-text);
  opacity: 0.64;
`;

const HeaderFlex = styled(Flex)`
  width: 100%;
  max-width: 500px;
`;
