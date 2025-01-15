import { useCallback, useEffect, useState } from 'react';
import { BigNumber, Contract } from 'ethers';
import { useContractFunction, useEthers } from '@usedapp/core';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { CLAIM_SUCCESS_ROUTE } from '@/constants/routes';
import { useWallets } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { distributorAbi } from '@/contracts/abi';

export const useUserRegistrationState = (address: string) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [distributionAmount, setDistributionAmount] = useState<BigNumber>();
  const [loading, setLoading] = useState(false);
  const { library } = useEthers();
  const { verifiedWallet } = useWallets();
  const { isWrongNetwork } = useConnectExtension();

  const update = useCallback(async () => {
    setLoading(true);
    const contract = new Contract(address, distributorAbi, library);

    const result = await contract.registrations(verifiedWallet?.value);
    setDistributionAmount(result[1]);
    setIsRegistered(result[2]);
    setLoading(false);
  }, [verifiedWallet, address, library]);

  useEffect(() => {
    if (verifiedWallet && library && address && !isWrongNetwork) {
      update();
    }
  }, [address, library, verifiedWallet, isWrongNetwork]);

  return { isRegistered, distributionAmount, loading };
};

export const useRegisterUser = (
  address: string,
  successCallback?: () => void,
) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const contract = new Contract(address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'register',
    {
      transactionName: 'register',
      // @ts-ignore
      gasLimitBufferPercentage: 10,
    },
  );

  const register = useCallback(async () => {
    setLoading(true);
    await send();
  }, [send]);

  useEffect(() => {
    (async () => {
      if (loading && state.status === 'Success') {
        resetState();
        setLoading(false);
        if (successCallback) {
          successCallback();
        }
        router.push(CLAIM_SUCCESS_ROUTE);
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, register };
};

export const useIsParticipant = (address: string) => {
  const [isParticipant, setIsParticipant] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { library } = useEthers();
  const { verifiedWallet } = useWallets();
  const { isWrongNetwork } = useConnectExtension();

  const update = useCallback(async () => {
    setLoading(true);
    const contract = new Contract(address, distributorAbi, library);

    const result = await contract.participations(verifiedWallet?.value);
    setIsParticipant(result[1]);
    setLoading(false);
  }, [verifiedWallet, address, library]);

  useEffect(() => {
    if (verifiedWallet && library && address && !isWrongNetwork) {
      update();
    }
  }, [address, library, verifiedWallet, isWrongNetwork]);

  return { isParticipant, loading, update };
};

export const useParticipate = (
  address: string,
  successCallback?: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const contract = new Contract(address, distributorAbi);
  const { state, send, resetState } = useContractFunction(
    contract,
    'participate',
    {
      transactionName: 'participate',
      // @ts-ignore
      gasLimitBufferPercentage: 10,
    },
  );

  const participate = useCallback(async () => {
    setLoading(true);
    await send();
  }, [send]);

  useEffect(() => {
    (async () => {
      if (loading && state.status === 'Success') {
        resetState();
        setLoading(false);
        toast.success('You are a claim participant now!');
        if (successCallback) {
          successCallback();
        }
        // router.push(CLAIM_SUCCESS_ROUTE);
      }

      if (loading && state.status === 'Exception') {
        resetState();
        setLoading(false);
        toast.error(state.errorMessage || 'Something went wrong');
      }
    })();
  }, [loading, state.status]);

  return { loading, participate };
};
