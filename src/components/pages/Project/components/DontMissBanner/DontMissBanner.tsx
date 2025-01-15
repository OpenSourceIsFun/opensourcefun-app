import { Flex, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface DontMissBannerProps {
  children: ReactElement;
}

export const DontMissBanner = ({ children }: DontMissBannerProps) => (
  <Flex
    backgroundColor="background.dark"
    color="#fff"
    padding="24px"
    marginTop={['40px', '56px']}
    justifyContent="space-between"
    alignItems={['flex-start', 'flex-end']}
    borderRadius="8px"
    marginBottom="25px"
    flexDirection={['column', 'row']}
    gap="24px"
  >
    <div>
      <Text fontSize="24px" lineHeight="32px" color="#fff" fontWeight={600}>
        Register to the claim
      </Text>
      Don&apos;t miss the moment
    </div>
    {children}
  </Flex>
);
