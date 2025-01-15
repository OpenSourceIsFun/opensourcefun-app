import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { useCallback, useEffect, useState } from 'react';
import { Contract } from 'ethers';
import { useContractFunction } from '@usedapp/core';
import toast from 'react-hot-toast';
import { NEW_BLOCKTIME_DELAY } from '@/hooks/contracts';
import { distributorAbi } from '@/contracts/abi';

export interface RegistrationDatesFormValues {
  startDate: Date | null;
  endDate: Date | null;
}

export const useSetRegistrationRound = (
  project: Project,
  callback?: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const contract = new Contract(project.address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'setRegistrationRound',
    {
      transactionName: 'setRegistrationRound',
    },
  );

  const setRegistrationRound = useCallback(
    async ({ startDate, endDate }: RegistrationDatesFormValues) => {
      setLoading(true);
      if (startDate && endDate) {
        await send(
          ((startDate.getTime() - NEW_BLOCKTIME_DELAY) / 1000).toFixed(),
          (endDate.getTime() / 1000).toFixed(),
        );
      }
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
        toast.success('Registration dates updated successfully');
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, setRegistrationRound };
};
