import { BigNumber, Contract } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useContractFunction } from '@usedapp/core';
import toast from 'react-hot-toast';
import { distributorAbi } from '@/contracts/abi';
import {
  useIsParticipant,
  useUserRegistrationState,
} from '@/components/pages/Project/ProjectPage.hooks';
import { useGetVestingParameters } from '@/components/pages/BackOffice/components/VestingParameters/VestingParameters.hooks';

export type VestingPortion = {
  unlockingTime: BigNumber;
  percent: BigNumber;
  level: number;
  amount: BigNumber;
};

type VestingPortions = VestingPortion[];

const ZERO_LEVEL_PORTION = {
  unlockingTime: BigNumber.from(0),
  percent: BigNumber.from(0),
  level: 0,
  amount: BigNumber.from(0),
};

const getCurrentPortion = (vestingPortions: VestingPortions) => {
  const now = Date.now();
  const currentLevel = vestingPortions
    .reverse()
    .findIndex((portion) => portion.unlockingTime.toNumber() * 1000 < now);
  return currentLevel === -1
    ? ZERO_LEVEL_PORTION
    : vestingPortions[currentLevel];
};

// const getNextPortion = (vestingPortions: VestingPortions) => {
//   const now = Date.now();
//   // const currentLevel = vestingPortions
//   //   .reverse()
//   //   .findIndex((portion) => portion.unlockingTime.toNumber() * 1000 < now);
//
//   const currentLevel = vestingPortions.findIndex(
//     (portion) => portion.unlockingTime.toNumber() * 1000 > now,
//   );
//   return currentLevel === -1
//     ? vestingPortions[vestingPortions.length - 1]
//     : vestingPortions[currentLevel];
// };

export const useGetVestingState = (address: string) => {
  const [currentPortion, setCurrentPortion] = useState<VestingPortion>();
  const {
    vestingParams,
    hasWithdrawn,
    update,
    loading: isVestingLoading,
  } = useGetVestingParameters(address);
  const { distributionAmount, loading: isDistributionLoading } =
    useUserRegistrationState(address);
  const { isParticipant, loading: isParticipantLoading } =
    useIsParticipant(address);

  // TODO usememo
  let vestingPortions: VestingPortions = [];
  if (!vestingParams || !distributionAmount) {
    vestingPortions = [];
  } else {
    vestingPortions = vestingParams.unlockingTimes.reduce(
      (acc: VestingPortions, unlockingTime, index) => {
        const percent = vestingParams.percents[index];
        const amount = distributionAmount
          .mul(percent)
          .div(100)
          .add(acc[acc.length - 1]?.amount || 0);

        return [
          ...acc,
          {
            unlockingTime,
            percent: acc[acc.length - 1]?.percent.add(percent) || percent,
            level: index + 1,
            amount: amount,
          },
        ];
      },
      [],
    );
  }

  useEffect(() => {
    if (vestingPortions.length && !currentPortion) {
      setCurrentPortion(getCurrentPortion(vestingPortions));
    }
  }, [currentPortion, vestingPortions]);

  return {
    vestingPortions,
    currentPortion,
    hasWithdrawn,
    update,
    isVestingAvailable:
      vestingPortions.length && distributionAmount?.gt(0) && isParticipant,
    loading: isVestingLoading || isDistributionLoading || isParticipantLoading,
  };
};

export const useWithdraw = (address: string, callback?: () => void) => {
  const [loading, setLoading] = useState(false);
  const contract = new Contract(address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'withdraw',
    {
      transactionName: 'withdraw',
    },
  );

  const withdraw = useCallback(async () => {
    setLoading(true);
    await send();
  }, [send]);

  useEffect(() => {
    (async () => {
      if (loading && state.status === 'Success') {
        resetState();
        setLoading(false);
        toast.success(
          'Congratulations! You have successfully claimed your tokens.',
        );

        if (callback) {
          callback();
        }
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        if (callback) {
          callback();
        }
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, withdraw };
};
