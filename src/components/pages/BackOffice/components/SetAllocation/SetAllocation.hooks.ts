import { useCallback, useEffect, useState } from 'react';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { BigNumber, Contract } from 'ethers';
import { useContractFunction } from '@usedapp/core';
import toast from 'react-hot-toast';
import { distributorAbi } from '@/contracts/abi';

export interface UserAllocation {
  user: string;
  amount: BigNumber;
}

export type UserAllocations = UserAllocation[];

export const useSetUsersAllocation = (
  project: Project,
  callback?: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const contract = new Contract(project.address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'setMultipleAddressDistributionAmount',
    {
      transactionName: 'setMultipleAddressDistributionAmount',
    },
  );

  const setUsersAllocation = useCallback(
    async (allocations: UserAllocations) => {
      setLoading(true);
      await send(allocations);
    },
    [send],
  );

  useEffect(() => {
    (async () => {
      if (loading && state.status === 'Success') {
        if (callback) {
          callback();
        }
        resetState();
        setLoading(false);
        toast.success('Allocation set successfully');
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, setUsersAllocation };
};
