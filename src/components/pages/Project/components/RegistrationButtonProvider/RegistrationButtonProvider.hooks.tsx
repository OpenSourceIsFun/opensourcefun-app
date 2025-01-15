import { Round } from '@/hooks/contracts';
import { useEffect, useRef, useState } from 'react';
import { msToHMS } from '@/utils/date';
import { Flex } from '@chakra-ui/react';

const ONE_HOUR_MS = 1000 * 60 * 60;

const getRegistrationButtonText = (
  isLoggedIn: boolean,
  isRegistered: boolean,
  isParticipant: boolean,
  hasWithdrawn: boolean,
  registrationRound: Round,
  distributionRound: Round,
) => {
  const now = new Date();
  const vestingInfo = document && document.getElementById('vesting-info');
  const { startDate: registrationStartDate, endDate: registrationEndDate } =
    registrationRound;
  const { startDate: distributionStartDate, endDate: distributionEndDate } =
    distributionRound;

  if (!isLoggedIn) {
    return 'Join!';
  }

  if (hasWithdrawn) {
    return 'Claimed';
  }

  if (isRegistered && isParticipant && !vestingInfo) {
    return 'Claim soon';
  }

  if (isRegistered && isParticipant && vestingInfo) {
    return 'Claim now!';
  }

  if (isRegistered && !distributionStartDate) {
    return 'Joined';
  }

  if (isRegistered && distributionStartDate && now < distributionStartDate) {
    const startDelay = distributionStartDate.getTime() - now.getTime();
    const isLessThanHour = startDelay && startDelay < ONE_HOUR_MS;
    return isLessThanHour ? (
      <Flex width="133px" justifyContent="flex-start">
        Participate in {msToHMS(startDelay)}
      </Flex>
    ) : (
      'Participate soon'
    );
  }

  if (isRegistered && distributionEndDate && now > distributionEndDate) {
    return 'Participation closed';
  }

  if (isRegistered && distributionStartDate && now > distributionStartDate) {
    return 'Participate!';
  }

  if (
    !registrationStartDate ||
    !registrationEndDate ||
    now < registrationStartDate
  ) {
    const startDelay =
      registrationStartDate && registrationStartDate.getTime() - now.getTime();
    const isLessThanHour = startDelay && startDelay < ONE_HOUR_MS;
    return isLessThanHour ? (
      <Flex width="105px" justifyContent="flex-start">
        Opens in {msToHMS(startDelay)}
      </Flex>
    ) : (
      'Opens soon'
    );
  }

  if (now > registrationEndDate) {
    return 'Registration closed';
  }

  return 'Join!';
};

export const useRegistrationButtonState = (
  isLoggedIn: boolean,
  isRegistered: boolean,
  isParticipant: boolean,
  hasWithdrawn: boolean,
  registrationRound: Round,
  distributionRound: Round,
) => {
  const interval = useRef<NodeJS.Timer>();

  const [buttonText, setButtonText] = useState(
    getRegistrationButtonText(
      isLoggedIn,
      isRegistered,
      isParticipant,
      hasWithdrawn,
      registrationRound,
      distributionRound,
    ),
  );

  useEffect(() => {
    setButtonText(
      getRegistrationButtonText(
        isLoggedIn,
        isRegistered,
        isParticipant,
        hasWithdrawn,
        registrationRound,
        distributionRound,
      ),
    );
  }, [
    isLoggedIn,
    isRegistered,
    isParticipant,
    registrationRound,
    distributionRound,
  ]);

  useEffect(() => {
    if (registrationRound.startDate && registrationRound.endDate) {
      const startDelay =
        isRegistered && distributionRound.startDate
          ? distributionRound.startDate.getTime() - Date.now()
          : registrationRound.startDate.getTime() - Date.now();

      let countdownStart: NodeJS.Timeout;
      let countdownEnd: NodeJS.Timeout;
      if (startDelay > 0) {
        countdownStart = setTimeout(() => {
          interval.current = setInterval(() => {
            setButtonText(
              getRegistrationButtonText(
                isLoggedIn,
                isRegistered,
                isParticipant,
                hasWithdrawn,
                registrationRound,
                distributionRound,
              ),
            );
          }, 1000);

          countdownEnd = setTimeout(() => {
            interval.current && clearInterval(interval.current);
          }, startDelay);
        }, Math.max(startDelay - ONE_HOUR_MS, 0));
      }

      return () => {
        clearTimeout(countdownStart);
        clearTimeout(countdownEnd);
        interval.current && clearInterval(interval.current);
      };
    }
  }, [
    registrationRound,
    distributionRound,
    isRegistered,
    isLoggedIn,
    isParticipant,
  ]);

  return {
    buttonText,
    isRegistrationAvailable: buttonText === 'Join!',
    isRegistrationClosed: buttonText === 'Registration closed',
    isParticipationAvailable: buttonText === 'Participate!',
    isClaimAvailable: buttonText === 'Claim now!',
  };
};
