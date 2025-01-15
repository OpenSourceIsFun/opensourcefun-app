import { FC, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import {
  Flex,
  Heading,
  Image,
  Link,
  Text,
  usePrevious,
} from '@chakra-ui/react';
import { Button } from '@/components/common/Button';
import fetchJson, { FetchError } from '@/services/fetchJson';
import { useConnectExtension } from '@/hooks/useConnectExtension';
import { serviceUrl } from '@/config/env';
import { useIsMobile } from '@/hooks/useIsMobile';
import { sendMetricsWalletVerified } from '@/services/metrics';
import { shortenPolkaAddress } from '@/utils/wallets';
import { EVMWalletButton } from '@/components/EVMWalletButton/EVMWalletButton';
import { EVM_WALLET_NAME } from '@/components/pages/Profile/components/WalletsProvider/hooks/useWalletsState';

const WalletCard: FC<{
  type?: string;
  wallets: any[];
  verifyCallback: () => void;
}> = ({ type = EVM_WALLET_NAME, wallets, verifyCallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const previousAddress = usePrevious(walletAddress);
  const [error, setError] = useState('');
  const isMobile = useIsMobile();
  const {
    account,
    connectWC,
    isWrongNetwork,
    isLoading: isExtensionLoading,
    switchEthChain,
  } = useConnectExtension();

  useEffect(() => {
    setWalletConnected(!!account);
    if (account && !verified) {
      setWalletAddress(account);
    }
  }, [account]);

  useEffect(() => {
    if (wallets.length !== 0) {
      const wallet = wallets.find((wallet) => wallet.name === type);
      wallet !== undefined && setWalletAddress(wallet.value);
      setVerified(wallet !== undefined);
    }
  }, [wallets]);

  const verifyWallet = useCallback(async () => {
    let address;
    if (type === EVM_WALLET_NAME) {
      address = account;
    }
    if (walletAddress) address = walletAddress;

    try {
      setIsLoading(true);
      await fetchJson(`https://${serviceUrl}/wallets`, {
        method: 'POST',
        body: JSON.stringify({
          name: type,
          value: address,
        }),
      });
      setVerified(true);
      setIsLoading(false);
      setWalletAddress(walletAddress);
      sendMetricsWalletVerified();
      verifyCallback();
    } catch (e) {
      const typedError = e as FetchError;
      setError(typedError.data.message);
      setIsLoading(false);
    }
  }, [type, walletAddress, account, verifyCallback]);

  useEffect(() => {
    if (walletAddress !== previousAddress) {
      setError('');
    }
  }, [walletAddress, previousAddress]);

  const walletUrl = 'https://metamask.io/';
  const networkText = 'Astar';

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
          borderColor={verified ? 'primary.basic' : 'borderDark'}
          borderRadius={'4px'}
        >
          <Flex alignItems={'center'}>
            <Image
              margin="0px 14px 0px 11px"
              src="/images/astar_logo.png"
              alt="Astar"
              width="29px"
              height="29px"
              borderRadius="50%"
            />
            <WalletText>
              {((verified && walletAddress) ||
                (!verified && walletConnected)) &&
                shortenPolkaAddress(walletAddress)}
              {!verified && !walletConnected && networkText}
            </WalletText>
          </Flex>
          <Flex>
            {!walletConnected &&
              !verified &&
              !isMobile &&
              type === EVM_WALLET_NAME && (
                <EVMWalletButton
                  control={(props) => (
                    <Button
                      {...props}
                      height="36px"
                      variant="primary"
                      isLoading={isLoading || isExtensionLoading}
                    >
                      Connect
                    </Button>
                  )}
                />
              )}
            {!walletConnected && !verified && isMobile && (
              <Button height="36px" variant="primary" onClick={connectWC}>
                Connect
              </Button>
            )}
            {!verified && walletConnected && !isWrongNetwork && (
              <Button
                height="36px"
                variant="primary"
                onClick={verifyWallet}
                isLoading={isLoading || isExtensionLoading}
              >
                Verify
              </Button>
            )}
            {!verified && walletConnected && isWrongNetwork && (
              <Button
                height="36px"
                variant="primary"
                onClick={switchEthChain}
                isLoading={isLoading || isExtensionLoading}
              >
                Switch network
              </Button>
            )}
            {verified && (
              <Image
                marginRight="10px"
                src="/images/icon_ok.svg"
                alt="opensourcefun"
                width="20px"
                height="20px"
              />
            )}
          </Flex>
        </Flex>

        {error.length > 0 && (
          <Text
            color="error"
            fontFamily="Poppins"
            fontSize="14px"
            fontWeight="500"
            marginTop="5px"
          >
            {error}
          </Text>
        )}
        <Link
          marginTop="20px"
          fontFamily="Poppins"
          fontSize="14px"
          fontWeight="600"
          color="primary.basic"
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
