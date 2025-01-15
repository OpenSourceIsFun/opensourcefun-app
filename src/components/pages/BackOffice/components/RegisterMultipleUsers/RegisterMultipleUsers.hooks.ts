import { useCallback, useEffect, useState } from 'react';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { Contract } from 'ethers';
import { useContractFunction } from '@usedapp/core';
import toast from 'react-hot-toast';
import { distributorAbi } from '@/contracts/abi';

export interface RegisteredUser {
  address: string;
}

export type RegisteredUsers = RegisteredUser[];

export const useRegisterMultipleUsers = (
  project: Project,
  callback?: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const contract = new Contract(project.address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'registerMultipleUsers',
    {
      transactionName: 'registerMultipleUsers',
    },
  );

  const registerMultipleUsers = useCallback(
    async (users: string[]) => {
      setLoading(true);
      await send(users);
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

  return { loading, registerMultipleUsers };
};
