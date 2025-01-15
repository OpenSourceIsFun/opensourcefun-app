import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';
import { formatDisplayedDate } from '@/utils/date';
import { formatEther } from 'ethers/lib/utils';
import { VestingPortion } from '../../VestingInfo.hooks';
import { Separator } from '@/components/common/Separator/Separator';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';

interface VestingMobileViewProps {
  meta: ProjectMeta;
  currentPortion?: VestingPortion;
  vestingPortions: VestingPortion[];
}

export const VestingMobileView = (props: VestingMobileViewProps) => {
  const { meta, vestingPortions, currentPortion } = props;

  return (
    <>
      {vestingPortions.map((portion, index) => (
        <>
          {index !== 0 && <Separator />}
          <Flex
            key={portion.unlockingTime.toString()}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            transition="all 0.2s ease-in-out"
            _hover={{
              transform: 'scale(1.005)',
            }}
            fontWeight={portion.level === currentPortion?.level ? 600 : 400}
          >
            <div>
              <ItemHeader>Level</ItemHeader>
              <ItemHeader>Vested %</ItemHeader>
              <ItemHeader>Claim event</ItemHeader>
              <ItemHeader>Amount</ItemHeader>
            </div>
            <div>
              <Flex>Level {portion.level}</Flex>
              <Flex>{portion.percent.toString()}%</Flex>
              <Flex>
                {formatDisplayedDate(
                  new Date(portion.unlockingTime.toNumber() * 1000),
                )}
              </Flex>
              <Flex
                fontWeight={portion.level === currentPortion?.level ? 600 : 500}
              >
                {' '}
                {formatEther(portion.amount)} {meta.token}
              </Flex>
            </div>
          </Flex>
        </>
      ))}
    </>
  );
};

const ItemHeader = styled(Text)`
  opacity: 0.56;
  font-size: 14px;
  line-height: 16px;
  color: var(--chakra-colors-primary-basic);
  margin-bottom: 8px;
`;
