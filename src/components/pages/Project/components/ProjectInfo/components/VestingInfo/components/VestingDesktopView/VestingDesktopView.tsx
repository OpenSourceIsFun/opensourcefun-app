import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';
import { formatDisplayedDate } from '@/utils/date';
import { formatEther } from 'ethers/lib/utils';
import { Button } from '@/components/common/Button';
import { EVMWalletButton } from '@/components/EVMWalletButton/EVMWalletButton';
import { VestingPortion } from '../../VestingInfo.hooks';
import { useEthers } from '@usedapp/core';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';

interface VestingDesktopViewProps {
  meta: ProjectMeta;
  isWithdrawing: boolean;
  hasWithdrawn: boolean;
  currentPortion?: VestingPortion;
  vestingPortions: VestingPortion[];
  onWithdraw: () => void;
}
export const VestingDesktopView = (props: VestingDesktopViewProps) => {
  const { account } = useEthers();
  const {
    meta,
    isWithdrawing,
    hasWithdrawn,
    vestingPortions,
    currentPortion,
    onWithdraw,
  } = props;
  const claimAvailable =
    currentPortion?.level && currentPortion.level > 0 && !hasWithdrawn;

  return (
    <>
      <Flex>
        <ItemHeader width={['15%', '20%', '23%']} minWidth="40px">
          Level
        </ItemHeader>
        <ItemHeader width={claimAvailable ? '23%' : '30%'} minWidth="60px">
          Vested %
        </ItemHeader>
        <ItemHeader width={claimAvailable ? '23%' : '35%'} minWidth="100px">
          Claim event
        </ItemHeader>
        <ItemHeader width="20%">Amount</ItemHeader>
      </Flex>
      {vestingPortions.map((portion) => (
        <Flex
          key={portion.unlockingTime.toString()}
          flexDirection="row"
          alignItems="center"
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: 'scale(1.005)',
          }}
          fontWeight={portion.level === currentPortion?.level ? 600 : 400}
        >
          <Flex width={['15%', '20%', '23%']} minWidth="40px">
            Level {portion.level}
          </Flex>
          <Flex width={claimAvailable ? '23%' : '30%'} minWidth="60px">
            {portion.percent.toString()}%
          </Flex>
          <Flex width={claimAvailable ? '23%' : '35%'} minWidth="100px">
            {formatDisplayedDate(
              new Date(portion.unlockingTime.toNumber() * 1000),
            )}
          </Flex>
          <Flex
            width="20%"
            fontWeight={portion.level === currentPortion?.level ? 600 : 500}
          >
            {' '}
            {formatEther(portion.amount)} {meta.token}
          </Flex>
          {portion.level === currentPortion?.level && !hasWithdrawn && account && (
            <Button
              variant="primary"
              fontSize="13px"
              width="80px"
              height="40px"
              isLoading={isWithdrawing}
              onClick={onWithdraw}
            >
              Claim
            </Button>
          )}
          {portion.level === currentPortion?.level &&
            !hasWithdrawn &&
            !account && (
              <EVMWalletButton
                control={(innerProps) => (
                  <Button
                    variant="primary"
                    fontSize="13px"
                    width="80px"
                    height="40px"
                    {...innerProps}
                  >
                    Claim
                  </Button>
                )}
              />
            )}
        </Flex>
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
