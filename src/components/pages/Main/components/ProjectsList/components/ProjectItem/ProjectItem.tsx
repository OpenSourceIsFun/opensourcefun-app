import { Flex, Grid, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import styled from '@emotion/styled';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';

interface ProjectItemProps {
  meta: ProjectMeta;
}

const getClaimUrl = (meta: ProjectMeta) => `/${meta.alias}/apply`;

const ProjectItemComponent = ({ meta }: ProjectItemProps) => {
  return (
    <Flex
      backgroundColor="#303030"
      borderRadius="8px"
      flexDirection="column"
      overflow="hidden"
    >
      <Image src={meta.bannerFile} objectFit="cover" width="100%" />
      <Flex padding="24px" flexDirection="column">
        <Flex alignItems="center">
          <Image
            src={meta.logoFile}
            height="44px"
            width="44px"
            marginRight="16px"
          />
          <Flex flexDirection="column">
            <Text
              fontSize="24px"
              lineHeight="32px"
              color="#fff"
              fontWeight={600}
            >
              {meta.title}
            </Text>
          </Flex>
        </Flex>
        <Flex marginTop="32px">
          <Text opacity={0.64} fontSize="14px" color="#fff" noOfLines={2}>
            {meta.overview}
          </Text>
        </Flex>
        <Grid marginTop="32px" gap="32px" gridTemplateColumns="1fr 1fr 1fr">
          <Flex flexDirection="column">
            <TableHeader>Networks</TableHeader>
            <TableData noOfLines={2}>{meta.network}</TableData>
          </Flex>
          <Flex flexDirection="column">
            <TableHeader>AI-Managers</TableHeader>
            <TableData>{meta.managers}</TableData>
          </Flex>
          <Flex flexDirection="column">
            <TableHeader>Check delta</TableHeader>
            <TableData>{meta.checkDelta}</TableData>
          </Flex>
        </Grid>
        <Separator />
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column">
            <TableHeader>Mode</TableHeader>
            <DateText>{meta.mode}</DateText>
          </Flex>
          <Link href={getClaimUrl(meta)}>
            <Button
              backgroundColor="accent.green"
              _hover={{
                backgroundColor: 'background.gray',
              }}
              width="157px"
            >
              Apply
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const ProjectItem = (props: ProjectMeta) => {
  return <ProjectItemComponent meta={props} />;
};

const TableData = styled(Text)`
  color: #ebebeb;
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
  color: #a5a5a5;
  margin-bottom: 8px;
`;

const Separator = styled('div')`
  width: 100%;
  border-top: 0.5px solid #a5a5a5;
  margin: 32px 0;
`;
