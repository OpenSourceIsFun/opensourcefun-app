import { ReactNode } from 'react';

import ThemeProvider from './theme';
import DAppProvider from './dApp';
import { WalletsProvider } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider>
      <DAppProvider>
        <WalletsProvider>{children}</WalletsProvider>
      </DAppProvider>
    </ThemeProvider>
  );
};

export default Providers;

export * from './theme';
