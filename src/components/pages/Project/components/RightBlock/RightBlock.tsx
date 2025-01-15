import { Flex, Image, Spinner, Tag, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { DisplayedDate } from '@/components/pages/Project/ProjectPage';
import { JoinButton } from '@/components/pages/Project/components/JoinButton/JoinButton';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import * as React from 'react';
import web from '@/assets/web.svg';
import { BsTwitter } from 'react-icons/bs';
import githubIcon from '@/assets/github_inverted.svg';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';

interface RightBlockProps {
  loading: boolean;
  isDatesLoading: boolean;
  displayedDate: DisplayedDate;
  meta: ProjectMeta;
  isWalletButton: boolean;
  onJoin: () => void;
}

const socials = [
  <Image src={web} color="#FFF" key="web" />,
  <Image as={BsTwitter} color="#FFF" key="twitter" />,
  <Image as={FaTelegramPlane} color="#FFF" key="twitter" />,
  <Image as={FaDiscord} color="#FFF" key="discord" />,
  <Image src={githubIcon} color="#FFF" key="github" fill="red" stroke="blue" />,
];

export const RightBlock = (props: RightBlockProps) => {
  const {
    loading,
    displayedDate,
    isDatesLoading,
    meta,
    isWalletButton,
    onJoin,
  } = props;

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
        backgroundColor="#fff"
        padding="32px"
        borderRadius="8px"
        flexDirection="column"
        width={['100%', '100%', '100%', '360px']}
        height="fit-content"
        border="1px solid var(--chakra-colors-background-gray)"
      >
        <Flex gap="12px" flexDirection="column">
          <div>
            <TableHeader>Major Contributor</TableHeader>
            <TableData>{meta.majorContributor}</TableData>
          </div>
          <div>
            <TableHeader>Preferred experience</TableHeader>
            <TableData>{meta.preferredExperience}</TableData>
          </div>
          <div>
            <TableHeader>Total allocation</TableHeader>
            <TableData>{meta.totalAllocation}</TableData>
          </div>
        </Flex>
        <Separator />
        <Flex
          justifyContent="space-between"
          flexDirection={['column', 'row']}
          gap="15px"
        >
          <Flex flexDirection="column" justifyContent="center">
            {isDatesLoading ? (
              <Spinner />
            ) : (
              <>
                <TableHeader>{displayedDate.type}</TableHeader>
                <TableData>{displayedDate.date}</TableData>
              </>
            )}
          </Flex>
          <JoinButton
            variant="primary"
            minWidth="100px"
            flexShrink={0}
            width={['100%', 'fit-content']}
            loading={loading}
            onClick={onJoin}
            isWalletButton={isWalletButton}
          />
        </Flex>
      </Flex>
      <Flex
        width={['100%', '100%', '100%', '360px']}
        borderRadius="100px"
        padding="16px"
        height="80px"
        backgroundColor="#fff"
        alignItems="center"
        justifyContent="space-between"
        display="none"
        border="1px solid var(--chakra-colors-background-gray)"
      >
        {socials.map((icon, index) => (
          <Tag
            key={index}
            bg="background.dark"
            width="48px"
            height="48px"
            borderRadius="100%"
            cursor="pointer"
            justifyContent="center"
            alignItems="center"
          >
            {icon}
          </Tag>
        ))}
      </Flex>
    </Flex>
  );
};

const TableData = styled(Text)`
  color: var(--chakra-colors-primary-basic);
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
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
