import { FC } from 'react';
import styled from '@emotion/styled';

import { Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import { Button } from '@/components/common/Button';
import { EVMWalletButton } from '@/components/EVMWalletButton/EVMWalletButton';

const WalletCard: FC<{
  type?: string;
  wallets: any[];
  verifyCallback: () => void;
}> = () => {
  const walletUrl = 'https://phantom.com/';

  return (
    <>
      <Flex width="100%" marginBottom="30px">
        <Heading fontSize="25px" fontWeight={600}>
          Connect
        </Heading>
      </Flex>
      <Flex
        marginBottom={'24px'}
        position={'relative'}
        flexDirection={'column'}
        width={['100%', '100%', '100%', '100%', '466px']}
        padding={['16px', '26px 50px']}
        border="1px solid #E9E9E9"
        borderRadius="4px"
      >
        <Flex
          width="100%"
          display="flex"
          height="48px"
          padding={'6px'}
          alignItems="center"
          justifyContent="space-between"
          flexDirection={'row'}
          border="1px solid var(--chakra-colors-borderDark)"
          borderColor={'primary.basic'}
          borderRadius={'4px'}
        >
          <Flex alignItems={'center'}>
            <Image
              margin="0px 14px 0px 11px"
              src="/images/logos/solana_logo.png"
              alt="Solana"
              width="29px"
              height="29px"
              borderRadius="50%"
            />
            <WalletText>Solana</WalletText>
          </Flex>
          <Flex>
            <EVMWalletButton
              control={(props) => (
                <Button {...props} height="36px" variant="primary">
                  Connect
                </Button>
              )}
            />
          </Flex>
        </Flex>
        <Link
          marginTop="20px"
          fontFamily="Poppins"
          fontSize="14px"
          fontWeight="600"
          href={walletUrl}
          target="blank"
        >
          Get wallet
        </Link>
      </Flex>
    </>
  );
};

const WalletText = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  padding-left: 25px;
  height: 20px;
  border-left: 1px solid #e0e0e0;

  @media (max-width: 500px) {
    padding-left: 10px;
  }
`;

export default WalletCard;
