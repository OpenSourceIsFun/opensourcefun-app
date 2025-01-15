import { useCallback, useEffect, useState } from 'react';
import { Contract } from 'ethers';
import { useContractFunction } from '@usedapp/core';
import toast from 'react-hot-toast';
import { distributorAbi } from '@/contracts/abi';

export const useWithdrawLeftover = (address: string) => {
  const [loading, setLoading] = useState(false);
  const contract = new Contract(address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'withdrawLeftover',
    {
      transactionName: 'withdrawLeftover',
    },
  );

  const withdrawLeftover = useCallback(async () => {
    setLoading(true);
    await send();
  }, [send]);

  useEffect(() => {
    (async () => {
      if (loading && state.status === 'Success') {
        resetState();
        setLoading(false);
        toast.success('Tokens withdrawn successfully');
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, withdrawLeftover };
};
