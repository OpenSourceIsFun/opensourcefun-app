import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { useCallback, useEffect, useState } from 'react';
import { Contract } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';
import toast from 'react-hot-toast';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { distributorAbi } from '@/contracts/abi';
import { useWallets } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';

interface VestingEnd {
  vestingEnd: string;
}

export const useSetVestingEnd = (project: Project, callback?: () => void) => {
  const [loading, setLoading] = useState(false);
  const contract = new Contract(project.address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'setVestingEndDate',
    {
      transactionName: 'setVestingEndDate',
    },
  );

  const setVestingEnd = useCallback(
    async ({ vestingEnd }: VestingEnd) => {
      setLoading(true);
      await send(vestingEnd);
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
        toast.success('Vesting End updated successfully');
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, setVestingEnd };
};

export const useGetVestingEnd = (address: string) => {
  const [vestingEnd, setVestingEnd] = useState<string>();
  const { isWrongNetwork } = useConnectExtension();
  const [loading, setLoading] = useState(true);
  const { library } = useEthers();
  const { verifiedWallet } = useWallets();

  const update = useCallback(async () => {
    try {
      setLoading(true);
      const contract = new Contract(address, distributorAbi, library);

      const result = await contract.vestingEndDate();
      setVestingEnd(result);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, [address, library]);

  useEffect(() => {
    if (library && address && verifiedWallet?.value && !isWrongNetwork) {
      update();
    }
  }, [verifiedWallet?.value, address, library, isWrongNetwork]);

  return { vestingEnd, loading, update };
};
