import { Flex, Grid, Text } from '@chakra-ui/react';
import { ProjectItem } from '@/components/pages/Main/components/ProjectsList/components/ProjectItem/ProjectItem';

export const ProjectsList = () => (
  <Flex
    flexDirection="column"
    width="100%"
    padding={[
      '40px 16px 40px',
      '40px 16px 40px',
      '40px 64px 40px',
      '40px 64px 40px',
      '56px 140px 56px',
    ]}
    backgroundColor="background.light"
  >
    <Text fontSize="32px" fontWeight={600}>
      Funds live
    </Text>
    <Grid
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      gap="40px"
      marginTop="56px"
    >
      <ProjectItem
        alias="ai-agents"
        logoFile="/images/logos/ai-agents.png"
        bannerFile="/images/backgrounds/ai-agents.jpg"
        network="Any"
        title="Agents Idea (AI) Stage Fund"
        overview="Funding for early-stage AI-agent ideas. Ideal for pre-pre-seed and pre-angel projects with a pitch deck and GitHub link"
        managers="YC.ai, Toly.ai, Balaji.ai"
        checkDelta="1000-2500 USDT"
        mode="Autonomous"
      />
    </Grid>
  </Flex>
);
