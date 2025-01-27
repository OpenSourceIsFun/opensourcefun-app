import { Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';

interface ProjectInfoProps {
  meta: ProjectMeta;
}

export const ProjectInfo = ({ meta }: ProjectInfoProps) => {
  return (
    <div>
      <Flex
        backgroundColor="#303030"
        borderRadius="12px"
        marginTop="4px"
        flexDirection="column"
      >
        <Flex
          padding="16px 24px"
          alignItems="center"
          borderBottom="1px solid #A5A5A5"
        >
          <Image
            src={meta.logoFile}
            width="48px"
            height="48px"
            marginRight="8px"
          />
          <Text fontWeight={600}>{meta.title}</Text>
        </Flex>
        <Flex padding="36px 24px" flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center">
            <ItemHeader>Blockchain</ItemHeader>
            <ItemData>Base</ItemData>
          </Flex>
          <Separator />
          <div>
            <Flex
              flexDirection={['column', 'column', 'row']}
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyContent="space-between"
            >
              <ItemHeader>Funding Contract Address (EVM chain)</ItemHeader>
              <ItemData>TBA</ItemData>
            </Flex>
            <Flex
              flexDirection={['column', 'column', 'row']}
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyContent="space-between"
              marginTop="16px"
            >
              <ItemHeader>Total claim</ItemHeader>
              <ItemData>Up to 2500 USDT</ItemData>
            </Flex>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

const ItemData = styled(Text)`
  color: #ebebeb;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
`;

const ItemHeader = styled(Text)`
  opacity: 0.56;
  font-size: 14px;
  line-height: 16px;
  color: #a5a5a5;
  margin-bottom: 8px;
`;

const Separator = styled('div')`
  width: 100%;
  border-top: 0.5px solid #a5a5a5;
  margin: 24px 0;
`;
