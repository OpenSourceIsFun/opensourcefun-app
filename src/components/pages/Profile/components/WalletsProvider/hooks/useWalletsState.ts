import { useCallback, useEffect, useMemo, useState } from 'react';
import fetchJson from '@/services/fetchJson';
import { serviceUrl } from '@/config/env';
import { User } from '@/hooks/useUser';

export type WalletType = { name: string; value: string };
export type WalletsType = WalletType[];

export const EVM_WALLET_NAME = 'evm';

export const useWalletsState = (user?: User) => {
  const [wallets, setWallets] = useState<WalletsType>([]);
  const [loading, setLoading] = useState(true);

  const fetchWallets = useCallback(async () => {
    try {
      setLoading(true);
      const wallets: Array<{
        name: string;
        value: string;
      }> = await fetchJson(`https://${serviceUrl}/wallets`, {});
      setWallets(wallets);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.isLoggedIn && !wallets.length) fetchWallets();
    if (!user?.isLoggedIn && wallets.length) setWallets([]);
  }, [fetchWallets, user?.isLoggedIn, wallets.length]);

  const verifiedWallet = useMemo(
    () => wallets.find((wallet) => wallet.name === EVM_WALLET_NAME),
    [wallets],
  );

  const walletsAreVerified = !!verifiedWallet;

  return { wallets, walletsAreVerified, verifiedWallet, fetchWallets, loading };
};
