import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { useCallback, useEffect, useState } from 'react';
import { BigNumber, Contract } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';
import toast from 'react-hot-toast';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { distributorAbi } from '@/contracts/abi';

export interface DistributionParams {
  amountToDistribute: string | BigNumber;
  vestingPrecision: string;
  ownerAddress: string;
  tokenAddress?: string;
  tokensDeposited?: boolean;
  isCreated?: boolean;
  totalDistributed?: string;
}

export const useSetDistributionParameters = (
  project: Project,
  callback?: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const contract = new Contract(project.address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'setDistributionParameters',
    {
      transactionName: 'setDistributionParameters',
    },
  );

  const setDistributionParameters = useCallback(
    async ({
      amountToDistribute,
      vestingPrecision,
      ownerAddress,
    }: DistributionParams) => {
      setLoading(true);
      await send(amountToDistribute, vestingPrecision, ownerAddress);
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
        toast.success('Distribution parameters updated successfully');
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, setDistributionParameters };
};

export const useGetDistributionParameters = (address: string) => {
  const [distributionParams, setDistributionParams] =
    useState<DistributionParams>({
      ownerAddress: '',
      amountToDistribute: '',
      totalDistributed: '',
      vestingPrecision: '',
      tokensDeposited: false,
      isCreated: false,
    });
  const { isWrongNetwork } = useConnectExtension();
  const [loading, setLoading] = useState(true);
  const { library } = useEthers();

  const update = useCallback(async () => {
    try {
      setLoading(true);
      const contract = new Contract(address, distributorAbi, library);

      Promise.all([contract.distribution(), contract.vestingPrecision()]).then(
        ([
          [
            ownerAddress,
            isCreated,
            tokensDeposited,
            amountToDistribute,
            totalDistributed,
          ],
          vestingPrecision,
        ]) => {
          setDistributionParams({
            ownerAddress,
            isCreated,
            tokensDeposited,
            amountToDistribute,
            totalDistributed,
            vestingPrecision,
          });
          setLoading(false);
        },
      );
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, [address, library]);

  useEffect(() => {
    if (library && address && !isWrongNetwork) {
      update();
    }
  }, [address, library, isWrongNetwork]);

  return { distributionParams, loading, update };
};
