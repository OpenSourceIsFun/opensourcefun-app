import { useContractFunction, useEthers } from '@usedapp/core';
import { useCallback, useEffect, useState } from 'react';
import { Contract } from 'ethers';
import DistributorFactory from '@/contracts/abi/DistributorFactory.json';
import toast from 'react-hot-toast';
import { factoryAddress, factoryContract } from '@/contracts/abi';

export const useDeployNewContract = (callback?: (address: string) => void) => {
  const { library } = useEthers();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const { state, send, resetState } = useContractFunction(
    factoryContract,
    'create',
    {
      transactionName: 'Deploy contract',
    },
  );

  const deployContract = useCallback(async () => {
    setLoading(true);
    await send();
  }, [send]);

  useEffect(() => {
    (async () => {
      if (loading && library && state.status === 'Success') {
        const factory = new Contract(
          factoryAddress,
          DistributorFactory.abi,
          library,
        );

        const contractsCount = await factory.contractsCount();
        const newContractAddress = await factory.indexesToContracts(
          contractsCount - 1,
        );
        if (callback) {
          callback(newContractAddress);
        }
        resetState();
        setAddress(newContractAddress);
        setLoading(false);
        toast.success('New contract deployed');
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [library, loading, state.status]);

  return { state, loading, deployContract, address };
};
