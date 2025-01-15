import { createContext, ReactElement, useContext } from 'react';
import { Round } from '@/hooks/contracts';
import { useRegistrationButtonState } from '@/components/pages/Project/components/RegistrationButtonProvider/RegistrationButtonProvider.hooks';

interface RegistrationButtonContextType {
  buttonText: string | JSX.Element;
  isRegistrationAvailable: boolean;
  isParticipationAvailable: boolean;
  isClaimAvailable: boolean;
  hasWithdrawn: boolean;
}

interface RegistrationButtonProviderProps {
  isLoggedIn: boolean;
  isRegistered: boolean;
  isParticipant: boolean;
  hasWithdrawn: boolean;
  distributionRound: Round;
  registrationRound: Round;
  children: ReactElement<any, any>;
}

export const RegistrationButtonContext =
  createContext<RegistrationButtonContextType>({
    buttonText: '',
    isRegistrationAvailable: false,
    isParticipationAvailable: false,
    isClaimAvailable: false,
    hasWithdrawn: false,
  });

export const RegistrationButtonProvider = ({
  isLoggedIn,
  isRegistered,
  isParticipant,
  hasWithdrawn,
  registrationRound,
  distributionRound,
  children,
}: RegistrationButtonProviderProps) => {
  const {
    buttonText,
    isRegistrationAvailable,
    isParticipationAvailable,
    isClaimAvailable,
  } = useRegistrationButtonState(
    isLoggedIn,
    isRegistered,
    isParticipant,
    hasWithdrawn,
    registrationRound,
    distributionRound,
  );

  return (
    <RegistrationButtonContext.Provider
      value={{
        buttonText,
        isRegistrationAvailable,
        isParticipationAvailable,
        isClaimAvailable,
        hasWithdrawn,
      }}
    >
      {children}
    </RegistrationButtonContext.Provider>
  );
};

export const useRegistrationButton = () =>
  useContext(RegistrationButtonContext);
