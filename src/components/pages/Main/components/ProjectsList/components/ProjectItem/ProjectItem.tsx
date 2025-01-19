import { Flex, Grid, Image, Spinner, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import styled from '@emotion/styled';
import {
  useGetDisplayedDate,
  useGetDistributionRound,
  useGetRegistrationRound,
} from '@/hooks/contracts';
import {
  useIsParticipant,
  useUserRegistrationState,
} from '@/components/pages/Project/ProjectPage.hooks';
import {
  ProjectMeta,
  useProjectMeta,
} from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';
import { getImageUrl } from '@/utils/getImageUrl';
import { Loading } from '@/components/common/Loading/Loading';

interface ProjectItemProps {
  meta: ProjectMeta;
}

const getClaimUrl = (meta: ProjectMeta) =>
  `/${meta.network.toLowerCase()}/apply/${meta.alias}`;

const ProjectItemComponent = ({ meta }: ProjectItemProps) => {
  const { isRegistered, loading: isRegisteredLoading } =
    useUserRegistrationState(meta.address);
  const {
    loading: isRegistrationRoundLoading,
    registrationRound,
    update: updateRegistrationRound,
  } = useGetRegistrationRound(meta.address);
  const {
    loading: isDistributionRoundLoading,
    distributionRound,
    update: updateDistributionRound,
  } = useGetDistributionRound(meta.address);
  const { isParticipant, loading: isParticipantLoading } = useIsParticipant(
    meta.address,
  );
  const displayedDate = useGetDisplayedDate(
    registrationRound,
    distributionRound,
    isRegistered,
    isParticipant,
    () => {
      updateRegistrationRound();
      updateDistributionRound();
    },
  );
  const loading =
    isRegistrationRoundLoading ||
    isDistributionRoundLoading ||
    isParticipantLoading ||
    isRegisteredLoading;

  return (
    <Flex
      backgroundColor="#fff"
      borderRadius="8px"
      flexDirection="column"
      overflow="hidden"
      border="1px solid var(--chakra-colors-background-gray)"
    >
      <Image
        src={getImageUrl(meta.bannerFile)}
        objectFit="cover"
        width="100%"
      />
      <Flex padding="24px" flexDirection="column">
        <Flex alignItems="center">
          <Image
            src={getImageUrl(meta.logoFile)}
            height="44px"
            width="44px"
            marginRight="16px"
          />
          <Flex flexDirection="column">
            <Text fontSize="24px" lineHeight="32px" fontWeight={600}>
              {meta.title}
            </Text>
          </Flex>
        </Flex>
        <Flex marginTop="32px">
          <Text opacity={0.64} fontSize="14px" noOfLines={2}>
            {meta.overview}
          </Text>
        </Flex>
        <Grid marginTop="32px" gap="32px" gridTemplateColumns="1fr 1fr 1fr">
          <Flex flexDirection="column">
            <TableHeader>Major contributor</TableHeader>
            <TableData noOfLines={2}>{meta.majorContributor}</TableData>
          </Flex>
          <Flex flexDirection="column">
            <TableHeader>Preferred experience</TableHeader>
            <TableData>{meta.preferredExperience}</TableData>
          </Flex>
          <Flex flexDirection="column">
            <TableHeader>Total claim</TableHeader>
            <TableData>{meta.totalAllocation}</TableData>
          </Flex>
        </Grid>
        <Separator />
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <TableHeader>{displayedDate.type}</TableHeader>
                <DateText>{displayedDate.date}</DateText>
              </>
            )}
          </Flex>
          <Link href={getClaimUrl(meta)}>
            <Button variant="primary" width="157px">
              View details
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const ProjectItem = (props: { alias: string }) => {
  const { projectMeta, loading: isMetaLoading } = useProjectMeta(
    undefined,
    props.alias,
  );

  if (!projectMeta || isMetaLoading) {
    return <Loading />;
  }

  return <ProjectItemComponent meta={projectMeta} />;
};

const TableData = styled(Text)`
  color: var(--chakra-colors-primary-basic);
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;

const DateText = styled(TableData)`
  font-size: 20px;
`;

const TableHeader = styled(Text)`
  opacity: 0.56;
  font-size: 12px;
  line-height: 16px;
  color: var(--chakra-colors-primary-basic);
  margin-bottom: 8px;
`;

const Separator = styled('div')`
  width: 100%;
  border-top: 0.5px solid var(--chakra-colors-background-gray);
  margin: 32px 0;
`;
