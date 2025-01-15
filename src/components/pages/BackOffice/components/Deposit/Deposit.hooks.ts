import { useCallback, useEffect, useState } from 'react';
import { Contract } from 'ethers';
import { useContractFunction } from '@usedapp/core';
import toast from 'react-hot-toast';
import { distributorAbi } from '@/contracts/abi';
import { useGetDistributionParameters } from '@/components/pages/BackOffice/components/DistributionParameters/DistributionParameters.hooks';

export const useDepositTokens = (address: string) => {
  const [loading, setLoading] = useState(false);
  const { distributionParams } = useGetDistributionParameters(address);
  const contract = new Contract(address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'depositTokens',
    {
      transactionName: 'depositTokens',
    },
  );

  const depositTokens = useCallback(async () => {
    setLoading(true);
    await send({ value: distributionParams.amountToDistribute });
  }, [distributionParams.amountToDistribute, send]);

  useEffect(() => {
    (async () => {
      if (loading && state.status === 'Success') {
        resetState();
        setLoading(false);
        toast.success('Tokens deposited successfully');
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, depositTokens };
};
