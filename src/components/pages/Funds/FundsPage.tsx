import { Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';
import { Button } from '@/components/common/Button';
import { Footer, FooterWrapper } from '@/components/footer';
import { useIsMobile } from '@/hooks/useIsMobile';
import Link from 'next/link';

interface Network {
  name: string;
  icon: string;
  based: string;
  text: string;
  isComingSoon: boolean;
}

const NETWORKS: Network[] = [
  {
    name: 'Astar',
    icon: '/images/astar_logo.png',
    based: 'EVM based',
    text: 'Astar is a multi-chain smart contract platform that supports multiple blockchains and virtual machines.',
    isComingSoon: false,
  },
  {
    name: 'Moonbeam',
    icon: '/images/moonbeam_logo.png',
    based: 'EVM based',
    text: 'An Ethereum-compatible smart contract parachain on Polkadot.',
    isComingSoon: true,
  },
  {
    name: 'Gear',
    icon: '/images/gear_logo.png',
    based: 'Polkadot based',
    text: 'An advanced WASM based smart contract platform capable of being deployed as a Kusama and Polkadot parachain',
    isComingSoon: true,
  },
];

const NetworkItem = (props: { network: Network }) => {
  const {
    network: { icon, based, text, name, isComingSoon },
  } = props;

  const isMobile = useIsMobile();

  return (
    <Flex
      backgroundColor="rgba(118, 118, 128, 0.12)"
      borderRadius="8px"
      padding="32px"
      flexDirection="column"
      flexShrink={0}
      flexGrow={0}
      height="362px"
      minWidth="280px"
      maxWidth={isMobile ? '31vw' : 'auto'}
    >
      <Flex>
        <Image width="64px" height="64px" src={icon} marginRight="18px" />
        <div>
          <Text fontWeight={600} fontSize="20px" lineHeight="32px">
            {name}
          </Text>
          <Text opacity={0.64}>{based}</Text>
        </div>
      </Flex>
      <Text marginTop="16px">{text}</Text>
      {isComingSoon ? (
        <Button variant="secondary" marginTop="auto">
          Coming soon
        </Button>
      ) : (
        <Link href="/astar">
          <Button
            marginTop="auto"
            backgroundColor="accent.green"
            _hover={{
              backgroundColor: 'background.gray',
            }}
          >
            Show available funds
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export const FundsPage = () => {
  const isMobile = useIsMobile();
  return (
    <Flex width="100%" flexShrink={0} flexDirection="column">
      <Flex
        padding={[
          '56px 24px',
          '56px 24px',
          '56px 24px',
          '56px 24px',
          '96px 140px',
        ]}
        flexDirection="column"
        borderRadius="8px"
        backgroundColor="background.light"
      >
        <div>
          <Heading fontSize="32px" marginBottom="8px">
            Choose your project provider
          </Heading>
          <Text>
            Pick the network you are used to and we will find the projects
            running on this blockchain.
          </Text>
        </div>
        {isMobile ? (
          <Flex
            marginTop="32px"
            overflowX="scroll"
            marginRight="-24px"
            gap="12px"
          >
            {NETWORKS.map((network) => (
              <NetworkItem key={network.name} network={network} />
            ))}
          </Flex>
        ) : (
          <Grid marginTop="32px" gridTemplateColumns="33% 33% 33%" gap="12px">
            {NETWORKS.map((network) => (
              <NetworkItem key={network.name} network={network} />
            ))}
          </Grid>
        )}
      </Flex>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Flex>
  );
};
