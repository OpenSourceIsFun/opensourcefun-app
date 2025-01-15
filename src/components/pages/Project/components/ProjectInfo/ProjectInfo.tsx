import { Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { shortenPolkaAddress } from '@/utils/wallets';
import { useWithWidth } from '@/hooks/useWithWidth';
import { Astar } from '@/providers/dApp';
import { VestingInfo } from './components/VestingInfo/VestingInfo';
import { getImageUrl } from '@/utils/getImageUrl';
import { LOGO_BY_NETWORK } from '@/components/pages/Project/ProjectPage.constants';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';

interface ProjectInfoProps {
  meta: ProjectMeta;
  withdrawCallback: () => void;
}

export const ProjectInfo = ({ meta, withdrawCallback }: ProjectInfoProps) => {
  const width = useWithWidth();

  const address =
    width < 400
      ? shortenPolkaAddress(meta.address, 10)
      : width < 500
      ? shortenPolkaAddress(meta.address, 16)
      : meta.address;

  return (
    <div>
      <Flex
        backgroundColor="#fff"
        borderRadius="12px"
        marginTop="4px"
        flexDirection="column"
        border="1px solid var(--chakra-colors-background-gray)"
      >
        <Flex
          padding="16px 24px"
          alignItems="center"
          borderBottom="1px solid var(--chakra-colors-background-gray)"
        >
          <Image
            src={getImageUrl(meta.logoFile)}
            width="48px"
            height="48px"
            marginRight="8px"
          />
          <Text fontWeight={600}>{meta.title}</Text>
        </Flex>
        <Flex padding="36px 24px" flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center">
            <ItemHeader>Blockchain</ItemHeader>
            <ItemData>
              <Flex alignItems="center">
                <Image
                  src={LOGO_BY_NETWORK[meta.network]}
                  width="24px"
                  height="24px"
                  marginRight="8px"
                />
                {meta.network}
              </Flex>
            </ItemData>
          </Flex>
          <Separator />
          <div>
            <Flex
              flexDirection={['column', 'column', 'row']}
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyContent="space-between"
            >
              <ItemHeader>Claim Contract Address</ItemHeader>
              <Link href={Astar.getExplorerAddressLink(meta.address)}>
                <ItemData
                  transition="all 0.2s ease-in-out"
                  cursor="pointer"
                  _hover={{
                    transform: 'scale(1.02)',
                    color: 'var(--chakra-colors-accent-blue)',
                  }}
                >
                  {address}
                </ItemData>
              </Link>
            </Flex>
            <Flex
              flexDirection={['column', 'column', 'row']}
              alignItems={['flex-start', 'flex-start', 'center']}
              justifyContent="space-between"
              marginTop="16px"
            >
              <ItemHeader>Total claim</ItemHeader>
              <ItemData>{meta.totalAllocation}</ItemData>
            </Flex>
          </div>
        </Flex>
        <VestingInfo meta={meta} withdrawCallback={withdrawCallback} />
      </Flex>
    </div>
  );
};

const ItemData = styled(Text)`
  color: var(--chakra-colors-primary-basic);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
`;

const ItemHeader = styled(Text)`
  opacity: 0.56;
  font-size: 14px;
  line-height: 16px;
  color: var(--chakra-colors-primary-basic);
  margin-bottom: 8px;
`;

const Separator = styled('div')`
  width: 100%;
  border-top: 0.5px solid var(--chakra-colors-background-gray);
  margin: 24px 0;
`;
