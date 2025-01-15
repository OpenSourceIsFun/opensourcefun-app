import { useCallback, useEffect, useState } from 'react';
import { Contract } from 'ethers';
import { useEthers } from '@usedapp/core';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { DisplayedDate } from '@/components/pages/Project/ProjectPage';
import { formatDisplayedDate } from '@/utils/date';
import { distributorAbi } from '@/contracts/abi';

const INITIAL_DATE: DisplayedDate = {
  type: 'Start date',
  date: 'TBA',
};

const EMPTY_DATE: DisplayedDate = {
  type: '',
  date: '',
};

export interface Round {
  startDate: Date | null;
  endDate: Date | null;
}

export const NEW_BLOCKTIME_DELAY = 180000;
export const MAX_TIMEOUT_VALUE = 2147483647;

export const useGetRegistrationRound = (address: string) => {
  const [registrationRound, setRegistrationRound] = useState<Round>({
    startDate: null,
    endDate: null,
  });
  const { isWrongNetwork } = useConnectExtension();
  const [loading, setLoading] = useState(true);
  const { library } = useEthers();

  const update = useCallback(async () => {
    try {
      setLoading(true);
      const contract = new Contract(address, distributorAbi, library);

      const [startDate, endDate] = await contract.registrationRound();

      setRegistrationRound({
        startDate:
          startDate.toNumber() > 0
            ? new Date(startDate.toNumber() * 1000 + NEW_BLOCKTIME_DELAY)
            : null,
        endDate:
          endDate.toNumber() > 0 ? new Date(endDate.toNumber() * 1000) : null,
      });
      setLoading(false);
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

  return { registrationRound, loading, update };
};

export const useGetDisplayedDate = (
  registrationRound: Round,
  distributionRound: Round,
  isRegistered: boolean,
  isParticipant: boolean,
  callback: () => void,
) => {
  const [displayedDate, setDisplayedDate] =
    useState<DisplayedDate>(INITIAL_DATE);

  useEffect(() => {
    const now = Date.now();
    const { startDate: registrationStartDate, endDate: registrationEndDate } =
      registrationRound;
    const { startDate: distributionStartDate, endDate: distributionEndDate } =
      distributionRound;

    if (registrationStartDate && registrationEndDate) {
      const isRegistrationClosed = now > registrationEndDate.getTime();
      const startDate =
        isRegistrationClosed && distributionStartDate && isRegistered
          ? distributionStartDate
          : registrationStartDate;
      const endDate =
        isRegistrationClosed && distributionEndDate && isRegistered
          ? distributionEndDate
          : registrationEndDate;

      const startDelay = startDate.getTime() - now;
      const endDelay = endDate.getTime() - now;

      let timer: NodeJS.Timeout;
      if (startDelay > 0) {
        setDisplayedDate({
          type: 'Start date',
          date: formatDisplayedDate(startDate),
        });

        if (startDelay < MAX_TIMEOUT_VALUE) {
          timer = setTimeout(callback, startDelay);
        }
      } else if (endDelay > 0) {
        setDisplayedDate({
          type: 'End date',
          date: formatDisplayedDate(endDate),
        });

        if (endDelay < MAX_TIMEOUT_VALUE) {
          timer = setTimeout(callback, endDelay);
        }
      } else if (endDelay < 0) {
        setDisplayedDate(EMPTY_DATE);
      }

      return () => clearTimeout(timer);
    }
  }, [registrationRound, distributionRound]);

  return isParticipant ? EMPTY_DATE : displayedDate;
};

export const useGetDistributionRound = (address: string) => {
  const [distributionRound, setDistributionRound] = useState<Round>({
    startDate: null,
    endDate: null,
  });
  const { isWrongNetwork } = useConnectExtension();
  const [loading, setLoading] = useState(true);
  const { library } = useEthers();

  const update = useCallback(async () => {
    try {
      setLoading(true);
      const contract = new Contract(address, distributorAbi, library);

      const [startDate, endDate] = await contract.distributionRound();

      setDistributionRound({
        startDate:
          startDate.toNumber() > 0
            ? new Date(startDate.toNumber() * 1000 + NEW_BLOCKTIME_DELAY)
            : null,
        endDate:
          endDate.toNumber() > 0 ? new Date(endDate.toNumber() * 1000) : null,
      });
      setLoading(false);
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

  return { distributionRound, loading, update };
};
