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
      Upcoming claims
    </Text>
    <Grid
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      gap="40px"
      marginTop="56px"
    >
      <ProjectItem alias="astar" />
      <ProjectItem alias="algem" />
    </Grid>
  </Flex>
);
