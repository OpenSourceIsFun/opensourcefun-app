import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import {
  KycStatusTypes,
  useKYCStatusState,
} from '@/components/pages/Profile/components/KYCProvider/hooks/useKYCStatusState';
import useUser from '@/hooks/useUser';

export type KYCContextType = {
  isKYCAccepted: boolean;
  isKYCNotVerified: boolean;
  isKYCInProgress: boolean;
  isKYCDeclined: boolean;
  isKYCBlocked: boolean;
  setKYCStatus: Dispatch<SetStateAction<KycStatusTypes | null | undefined>>;
};

export const KYCContext = createContext<KYCContextType>({
  isKYCAccepted: false,
  isKYCNotVerified: false,
  isKYCInProgress: false,
  isKYCDeclined: false,
  isKYCBlocked: false,
  setKYCStatus: () => null,
});

interface KYCProviderProps {
  children: React.ReactNode;
}

export const KYCProvider = ({ children }: KYCProviderProps) => {
  const { user } = useUser();
  const kycStatus = useKYCStatusState(user);

  return (
    <KYCContext.Provider value={kycStatus}>{children}</KYCContext.Provider>
  );
};

export const useKYCStatus = () => useContext(KYCContext);
