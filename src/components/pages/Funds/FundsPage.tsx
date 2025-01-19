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
    name: 'Ai Agents',
    icon: '/images/funds/ai-agents.png',
    based: 'Base, Solana, Sonic.',
    text: 'Autonomous AI systems that execute tasks, make decisions, and drive innovation without human intervention. Perfect for projects leveraging intelligent automation.',
    isComingSoon: false,
  },
  {
    name: 'DeSci',
    icon: '/images/funds/desci.png',
    based: 'Base, Solana',
    text: 'Transforming scientific research with blockchain: open, incentivized, and community-driven. Ideal for projects advancing transparent and collaborative science.',
    isComingSoon: true,
  },
  {
    name: 'Meme (tokens, infra)',
    icon: '/images/funds/meme.png',
    based: 'Base, Solana, BNB.',
    text: 'Where memes meet money: build viral, community-powered tokens that make finance fun, accessible, and unstoppable.',
    isComingSoon: true,
  },
  {
    name: 'L1/L2/L2s',
    icon: '/images/funds/l1-l2.png',
    based: 'Chain agnostic',
    text: 'The backbone of blockchain: funding for scalable, secure, and interoperable infrastructure projects on Layer 1, Layer 2, and beyond.',
    isComingSoon: true,
  },
  {
    name: 'Cryptography',
    icon: '/images/funds/crypto.png',
    based: 'Chain agnostic',
    text: 'Powering privacy and security in Web3: from zero-knowledge proofs to fully homomorphic encryption. A space for cutting-edge cryptographic innovation.',
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
            Choose your project type to apply
          </Heading>
          <Text>Pick the most suitable market for your project.</Text>
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
