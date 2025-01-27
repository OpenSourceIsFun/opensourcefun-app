import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Footer, FooterWrapper } from '@/components/footer';
import { useRouter } from 'next/router';
import { HOME_ROUTE } from '@/constants/routes';
import { Loading } from '@/components/common/Loading/Loading';
import { ClaimSteps } from '@/components/pages/Project/components/Steps/ClaimSteps';
import { ProjectPageHeader } from '@/components/pages/Project/components/ProjectPageHeader/ProjectPageHeader';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';
import { Button } from '@/components/common/Button';
import { ProjectInfo } from '@/components/pages/Project/components/ProjectInfo/ProjectInfo';
import { RightBlock } from './components/RightBlock/RightBlock';

export interface DisplayedDate {
  type: 'Start date' | 'End date' | '';
  date: string;
}

interface ClaimPageProps {
  meta: ProjectMeta;
}

const ClaimPageComponent = ({ meta }: ClaimPageProps) => {
  const vestingInfo = document.getElementById('vesting-info');

  return (
    <Flex width="100%" flexShrink={0} flexDirection="column">
      <ProjectPageHeader meta={meta}>
        <Button
          backgroundColor="accent.green"
          _hover={{
            backgroundColor: 'background.gray',
          }}
          width="157px"
        >
          Apply
        </Button>
      </ProjectPageHeader>
      <Flex
        padding={[
          '56px 24px 24px',
          '56px 24px 24px',
          '56px 24px 24px',
          '56px 32px 24px',
          '71px 140px',
        ]}
        backgroundColor="background.light"
        width="100%"
        flexDirection="column"
      >
        <Flex
          position="relative"
          gap={['0', '0', '0', '40px']}
          flexDirection={[
            'column-reverse',
            'column-reverse',
            'column-reverse',
            'row',
          ]}
        >
          <Flex
            width={['100%', '100%', '100%', 'calc(100% - 400px)']}
            flexDirection="column"
            gap={['24px', '32px', '32px', '56px']}
          >
            <div>
              <SectionTitle marginBottom="12px">Description</SectionTitle>
              <Description>{meta.description}</Description>
            </div>
            <ProjectInfo meta={meta} />
          </Flex>
          <RightBlock meta={meta} />
        </Flex>
      </Flex>
      <ClaimSteps
        isRegistered={false}
        isRegisteredLoading={false}
        hasVestingInfo={!!vestingInfo}
        hasWithdrawn={false}
      />
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Flex>
  );
};

export const ProjectPage = () => {
  const router = useRouter();
  const alias = router.query.fund as string;

  if (alias !== 'ai-agents') {
    router.push(HOME_ROUTE);
    return <Loading />;
  }

  return (
    <ClaimPageComponent
      meta={{
        network: 'Any',
        logoFile: '/images/logos/ai-agents.png',
        bannerFile: '/images/backgrounds/ai-agents.jpg',
        title: 'Agents idea (Ai) stage fund',
        alias: 'ai-agents',
        overview:
          'We prefer pre-preseed and pre-angel deals. Github + X + pitchdeck + drop few words to get ealriest support ever!',
        description:
          "Got a groundbreaking idea that could be worth billions? We're ready to support you from day one! It’s not just about funding — we’ll help with business development, networking, and even engineering.\n" +
          '\n' +
          'In return, we expect the best possible pre-pre-seed valuation — think of it as a co-founder price. And we’re here to stay with you until we hit at least 1000x together.',
      }}
    />
  );
};

const SectionTitle = styled(Text)`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: #ebebeb;
`;

const Description = styled(Text)`
  opacity: 0.64;
  font-size: 16px;
  line-height: 24px;
  color: #ebebeb;
`;
