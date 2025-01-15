import { createContext, useContext } from 'react';
import useUser from '@/hooks/useUser';
import {
  useWalletsState,
  WalletsType,
  WalletType,
} from '@/components/pages/Profile/components/WalletsProvider/hooks/useWalletsState';

export type WalletsContextType = {
  wallets: WalletsType;
  verifiedWallet?: WalletType;
  walletsAreVerified: boolean;
  loading: boolean;
  fetchWallets: () => void;
};

export const WalletsContext = createContext<WalletsContextType>({
  wallets: [],
  walletsAreVerified: false,
  loading: true,
  fetchWallets: () => null,
});

interface WalletsProviderProps {
  children: React.ReactNode;
}

export const WalletsProvider = ({ children }: WalletsProviderProps) => {
  const { user } = useUser();
  const walletsState = useWalletsState(user);

  return (
    <WalletsContext.Provider value={walletsState}>
      {children}
    </WalletsContext.Provider>
  );
};

export const useWallets = () => useContext(WalletsContext);
