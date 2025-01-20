import { Flex } from '@chakra-ui/react';
import { Button } from '@/components/common/Button';
import useUser from '@/hooks/useUser';
import { Dispatch, SetStateAction } from 'react';
import { useWallets } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';
import { AUTH_EMAIL_ROUTE } from '@/constants/routes';

import WalletCard from './components/WalletCard/WalletCard';
import { UserInfo } from '@/components/pages/Profile/components/WalletTab/components/UserInfo/UserInfo';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface WalletTabProps {
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

export const WalletTab = ({ setSelectedTab }: WalletTabProps) => {
  const router = useRouter();
  const { user } = useUser({
    redirectTo: AUTH_EMAIL_ROUTE,
  });
  const { wallets, walletsAreVerified, fetchWallets } = useWallets();
  const from = router.query.from;

  return (
    <Flex
      paddingBottom="100px"
      width={['100%', '100%', '100%', '100%', '466px']}
      flexDirection="column"
      key="wallet"
      alignItems="flex-end"
    >
      <WalletCard wallets={wallets} verifyCallback={fetchWallets} />
      {from && walletsAreVerified && (
        <Link href={from as string}>
          <Button width="120px" variant="primary">
            Back to claim
          </Button>
        </Link>
      )}
      <UserInfo key={JSON.stringify(user)} />
    </Flex>
  );
};
