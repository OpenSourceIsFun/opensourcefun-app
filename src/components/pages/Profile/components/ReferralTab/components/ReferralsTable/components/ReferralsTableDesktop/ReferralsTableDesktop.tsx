import { Flex } from '@chakra-ui/react';
import { WalletTableItem } from '@/components/pages/Profile/components/ReferralTab/components/ReferralsTable/components/WalletTableItem/WalletTableItem';
import { formatDisplayedDate } from '@/utils/date';
import { ReferralItem } from '@/components/pages/Profile/components/ReferralTab/components/ReferralsTable/ReferralsTable';

interface ReferralsTableDesktopProps {
  referrals: ReferralItem[];
}
export const ReferralsTableDesktop = ({
  referrals,
}: ReferralsTableDesktopProps) => (
  <>
    <Flex opacity="0.56" marginTop="32px" fontSize="14px">
      <Flex width="25%">Wallet</Flex>
      <Flex width="25%">Date</Flex>
      <Flex width="25%">Status</Flex>
      <Flex width="25%" justifyContent="flex-end">
        Reward
      </Flex>
    </Flex>
    {referrals.map((referral) => (
      <Flex key={referral.id} fontSize="14px" marginTop="40px">
        <Flex width="25%">
          <WalletTableItem wallet={referral.wallet} />
        </Flex>
        <Flex width="25%">
          {formatDisplayedDate(new Date(referral.createdAt))}
        </Flex>
        <Flex width="25%" color="success">
          Registered
        </Flex>
        <Flex width="25%" justifyContent="flex-end" fontWeight={600}>
          +{referral.reward}
        </Flex>
      </Flex>
    ))}
  </>
);
