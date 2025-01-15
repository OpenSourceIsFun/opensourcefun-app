import { Flex, Image, Spinner, Text } from '@chakra-ui/react';
import gpointsIcon from '@/assets/gpoints.svg';
import { useCallback, useEffect, useState } from 'react';
import fetchJson from '@/services/fetchJson';
import { API_GET_REWARDS } from '@/constants/routes';

interface TotalRewardsResponse {
  total: number;
}
export const Rewards = () => {
  const [total, setTotal] = useState<number>();

  const updateTotal = useCallback(async () => {
    const response = await fetchJson<TotalRewardsResponse>(API_GET_REWARDS);
    setTotal(response.total);
  }, []);

  useEffect(() => {
    updateTotal();
  }, []);

  return (
    <Flex
      width="260px"
      height="162px"
      backgroundColor="#fff"
      borderRadius="8px"
      flexDirection="column"
      padding="24px"
      marginBottom="20px"
      gap="16px"
    >
      {total ? (
        <>
          <Flex alignItems="center">
            <Image src={gpointsIcon} marginRight="8px" />
            <Text fontWeight={500}>G.points</Text>
          </Flex>
          <Flex fontSize="32px" fontWeight={600}>
            {total}
          </Flex>
          <Text
            textDecoration="underline"
            fontSize="14px"
            color="rgba(48, 48, 48, 0.64)"
          >
            Get more points
          </Text>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Spinner width="50px" height="50px" />
        </Flex>
      )}
    </Flex>
  );
};
