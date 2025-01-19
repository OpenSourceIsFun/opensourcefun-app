import { Flex, Heading, Image } from '@chakra-ui/react';
import starIcon from '@/assets/star.svg';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { FUNDS_ROUTE } from '@/constants/routes';

export const ClaimSuccessPage = () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    width="100%"
    flexDirection="column"
    position="relative"
  >
    <Image src="/images/clap_emoji.png" marginTop="66px" />
    <Image
      src={starIcon}
      position="absolute"
      top="140px"
      right="calc(50% - 270px)"
      width="24px"
      display={['none', 'none', 'block']}
    />
    <Image
      src={starIcon}
      position="absolute"
      top="200px"
      right="calc(50% + 300px)"
      width="32px"
      display={['none', 'none', 'block']}
    />
    <Heading
      textAlign="center"
      marginTop="42px"
      lineHeight="44px"
      padding="20px"
      maxWidth="620px"
    >
      Congratulations!
      <br />
      <br />
      Claim reminder will be sent to your email.
    </Heading>
    <Link href={FUNDS_ROUTE}>
      <Button
        variant="primary"
        width="150px"
        marginTop={['50px', '60px', '80px', '100px']}
      >
        Networks
      </Button>
    </Link>
  </Flex>
);
