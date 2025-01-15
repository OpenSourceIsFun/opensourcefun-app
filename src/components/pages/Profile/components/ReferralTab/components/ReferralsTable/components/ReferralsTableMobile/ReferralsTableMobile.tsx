import { Flex } from '@chakra-ui/react';
import { WalletTableItem } from '@/components/pages/Profile/components/ReferralTab/components/ReferralsTable/components/WalletTableItem/WalletTableItem';
import { formatDisplayedDate } from '@/utils/date';
import { ReferralItem } from '@/components/pages/Profile/components/ReferralTab/components/ReferralsTable/ReferralsTable';

interface ReferralsTableDesktopProps {
  referrals: ReferralItem[];
}
export const ReferralsTableMobile = ({
  referrals,
}: ReferralsTableDesktopProps) => (
  <>
    <Flex fontSize="14px" flexDirection="column">
      {referrals.map((referral) => (
        <Flex
          key={referral.id}
          fontSize="14px"
          flexDirection="column"
          width="100%"
          borderTop="1px solid #EBEBEB"
          padding="24px 0"
        >
          <Flex justifyContent="space-between">
            <Flex opacity="0.56">Wallet</Flex>
            <Flex>
              <WalletTableItem wallet={referral.wallet} />
            </Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Flex opacity="0.56">Date</Flex>
            <Flex>{formatDisplayedDate(new Date(referral.createdAt))}</Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Flex opacity="0.56">Status</Flex>
            <Flex color="success">Registered</Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Flex opacity="0.56" justifyContent="flex-end">
              Reward
            </Flex>
            <Flex justifyContent="flex-end" fontWeight={600}>
              +{referral.reward}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  </>
);
