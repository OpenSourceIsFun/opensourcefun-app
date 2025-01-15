import fetchJson from '@/services/fetchJson';
import { serviceUrl } from '@/config/env';
import { User } from '@/hooks/useUser';

export async function sendWalletLogs(
  name: string,
  network: string,
  address?: string,
  user?: User,
) {
  try {
    if (address && user?.token) {
      await fetchJson(`https://${serviceUrl}/wallet-logs`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          network,
          address,
        }),
      });
    }
  } catch (e) {
    console.error(e);
  }
}
