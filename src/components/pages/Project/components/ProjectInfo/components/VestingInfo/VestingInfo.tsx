import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useGetVestingState, useWithdraw } from './VestingInfo.hooks';
import { useDisclosure } from '@chakra-ui/hooks';
import { useCallback } from 'react';
import { WithdrawalPopup } from '@/components/pages/Project/components/ProjectInfo/components/VestingInfo/components/WithdrawalPopup/WithdrawalPopup';
import { Separator } from '@/components/common/Separator/Separator';
import { formatEther } from 'ethers/lib/utils';
import { VestingDesktopView } from '@/components/pages/Project/components/ProjectInfo/components/VestingInfo/components/VestingDesktopView/VestingDesktopView';
import { useIsMobile } from '@/hooks/useIsMobile';
import { VestingMobileView } from '@/components/pages/Project/components/ProjectInfo/components/VestingInfo/components/VestingMobileView/VestingMobileView';
import { Button } from '@/components/common/Button';
import { EVMWalletButton } from '@/components/EVMWalletButton/EVMWalletButton';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta.hooks';

interface VestingInfoProps {
  meta: ProjectMeta;
  withdrawCallback: () => void;
}

export const VestingInfo = ({ meta, withdrawCallback }: VestingInfoProps) => {
  const isMobile = useIsMobile();
  const { account } = useConnectExtension();
  const {
    vestingPortions,
    hasWithdrawn,
    currentPortion,
    update,
    isVestingAvailable,
    loading: isVestingLoading,
  } = useGetVestingState(meta.address);
  const { withdraw, loading: isWithdrawing } = useWithdraw(meta.address, () => {
    update();
    withdrawCallback();
  });
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onWithdraw = useCallback(async () => {
    withdraw();
    onClose();
  }, [withdraw, onClose]);

  if (isVestingLoading) {
    return <Spinner alignSelf="center" justifySelf="center" margin="50px" />;
  }

  if (!isVestingAvailable) {
    return null;
  }

  return (
    <Flex
      flexDirection="column"
      padding="0 24px 24px 24px"
      gap="20px"
      marginTop="-24px"
      id="vesting-info"
    >
      <Separator />
      {isMobile ? (
        <VestingMobileView
          meta={meta}
          currentPortion={currentPortion}
          vestingPortions={vestingPortions}
        />
      ) : (
        <VestingDesktopView
          meta={meta}
          isWithdrawing={isWithdrawing}
          currentPortion={currentPortion}
          vestingPortions={vestingPortions}
          hasWithdrawn={hasWithdrawn}
          onWithdraw={onOpen}
        />
      )}
      {!hasWithdrawn && (
        <>
          <Separator />
          <Flex direction="column" gap="8px">
            <Text fontSize="14px" opacity="0.56">
              Available to claim{' '}
            </Text>
            <Flex alignItems="center" gap="10px">
              <Text fontWeight={600} fontSize="20px">
                {currentPortion && formatEther(currentPortion?.amount)}{' '}
                {meta.token}
              </Text>
              <Text fontSize="20px" opacity="0.56">
                Level {currentPortion?.level}
              </Text>
            </Flex>
          </Flex>
          {isMobile && account && (
            <Button
              variant="primary"
              fontSize="13px"
              height="40px"
              isLoading={isWithdrawing}
              onClick={onOpen}
            >
              Claim
            </Button>
          )}
          {isMobile && !account && (
            <EVMWalletButton
              control={(innerProps) => (
                <Button
                  variant="primary"
                  fontSize="13px"
                  height="40px"
                  {...innerProps}
                >
                  Claim
                </Button>
              )}
            />
          )}
        </>
      )}

      <WithdrawalPopup
        onClose={onClose}
        isOpen={isOpen}
        onConfirm={onWithdraw}
      />
    </Flex>
  );
};
