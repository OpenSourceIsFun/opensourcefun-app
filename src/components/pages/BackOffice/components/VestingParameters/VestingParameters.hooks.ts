import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { useCallback, useEffect, useState } from 'react';
import { BigNumber, Contract } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';
import toast from 'react-hot-toast';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { distributorAbi } from '@/contracts/abi';
import { useWallets } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';

interface VestingParams {
  unlockingTimes: BigNumber[];
  percents: BigNumber[];
}

export const useSetVestingParameters = (
  project: Project,
  callback?: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const contract = new Contract(project.address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'setVestingParams',
    {
      transactionName: 'setVestingParams',
    },
  );

  const setVestingParameters = useCallback(
    async ({ unlockingTimes, percents }) => {
      setLoading(true);
      await send(
        unlockingTimes.replace(/\s/g, '').split(','),
        percents.replace(/\s/g, '').split(','),
      );
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
        toast.success('Vesting parameters updated successfully');
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, setVestingParameters };
};

export const useGetVestingParameters = (address: string) => {
  const [vestingParams, setVestingParams] = useState<VestingParams>();
  const [hasWithdrawn, setHasWithdrawn] = useState(false);
  const { isWrongNetwork } = useConnectExtension();
  const [loading, setLoading] = useState(true);
  const { library } = useEthers();
  const { verifiedWallet } = useWallets();

  const update = useCallback(async () => {
    try {
      setLoading(true);
      const contract = new Contract(address, distributorAbi, library);

      Promise.all([
        contract.getVestingUnlocks(),
        contract.getVestingPortions(),
        contract.addressToWithdraw(verifiedWallet?.value),
      ]).then(([unlockingTimes, percents, addressToWithdraw]) => {
        setVestingParams({
          unlockingTimes,
          percents,
        });
        setHasWithdrawn(addressToWithdraw);

        setLoading(false);
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, [address, library, verifiedWallet?.value]);

  useEffect(() => {
    if (library && address && verifiedWallet?.value && !isWrongNetwork) {
      update();
    }
  }, [verifiedWallet?.value, address, library, isWrongNetwork]);

  return { vestingParams, hasWithdrawn, loading, update };
};
