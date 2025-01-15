import { Flex, Heading } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import fetchJson from '@/services/fetchJson';
import { API_GET_REFERRALS } from '@/constants/routes';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ReferralsTableDesktop } from './components/ReferralsTableDesktop/ReferralsTableDesktop';
import { ReferralsTableMobile } from './components/ReferralsTableMobile/ReferralsTableMobile';

export interface ReferralItem {
  id: string;
  createdAt: string;
  wallet: string;
  reward: number;
}

export const ReferralsTable = () => {
  const [referrals, setReferrals] = useState<ReferralItem[]>([]);
  const isMobile = useIsMobile();
  const updateReferralCode = useCallback(async () => {
    const response = await fetchJson<ReferralItem[]>(API_GET_REFERRALS);
    setReferrals(response);
  }, []);

  useEffect(() => {
    updateReferralCode();
  }, []);

  return (
    <Flex
      flexDirection="column"
      backgroundColor="#fff"
      borderRadius="8px"
      padding="24px"
      width="100%"
    >
      <Flex width="100%" flexDirection="column">
        <Heading fontSize="25px" fontWeight={600}>
          Your referrals
        </Heading>
        <Flex marginTop="30px" fontWeight={600}>
          {referrals.reduce((total, referral) => (total += referral.reward), 0)}{' '}
          total
        </Flex>
      </Flex>
      {isMobile ? (
        <ReferralsTableMobile referrals={referrals} />
      ) : (
        <ReferralsTableDesktop referrals={referrals} />
      )}
    </Flex>
  );
};
