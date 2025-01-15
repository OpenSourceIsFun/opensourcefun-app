import { Flex, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Flex
      width="100%"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <Spinner width="50px" height="50px" />
    </Flex>
  );
};
