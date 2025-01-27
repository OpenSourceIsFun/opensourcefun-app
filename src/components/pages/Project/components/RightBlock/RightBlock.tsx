import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';
import { Button } from '@/components/common/Button';

interface RightBlockProps {
  meta: ProjectMeta;
}

export const RightBlock = (props: RightBlockProps) => {
  const { meta } = props;

  return (
    <Flex
      flexDirection="column"
      right={0}
      top="100px"
      gap="20px"
      height="fit-content"
      position={['static', 'static', 'static', 'sticky']}
      marginBottom={['40px', '40px', '40px', '0']}
      width={['100%', '100%', '100%', '360px']}
    >
      <Flex
        backgroundColor="#303030"
        padding="32px"
        borderRadius="8px"
        flexDirection="column"
        width={['100%', '100%', '100%', '360px']}
        height="fit-content"
      >
        <Flex gap="12px" flexDirection="column">
          <div>
            <TableHeader>AI-managers</TableHeader>
            <TableData>YC.ai, Toly.ai, Balaji.ai</TableData>
          </div>
          <div>
            <TableHeader>Networks</TableHeader>
            <TableData>Any</TableData>
          </div>
          <div>
            <TableHeader>Check delta</TableHeader>
            <TableData>1000-2500 USDT</TableData>
          </div>
        </Flex>
        <Separator />
        <Flex
          justifyContent="space-between"
          flexDirection={['column', 'row']}
          gap="15px"
        >
          <Flex flexDirection="column" justifyContent="center">
            <TableHeader>Mode</TableHeader>
            <TableData>Autonomous</TableData>
          </Flex>
          <Button
            variant="primary"
            minWidth="100px"
            flexShrink={0}
            width={['100%', 'fit-content']}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const TableData = styled(Text)`
  color: #ebebeb;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
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
