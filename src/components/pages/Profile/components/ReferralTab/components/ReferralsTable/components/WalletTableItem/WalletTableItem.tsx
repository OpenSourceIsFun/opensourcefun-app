import { Flex, Icon } from '@chakra-ui/react';
import { Button } from '@/components/common/Button';
import { FiCopy } from 'react-icons/fi';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

interface WalletTableItemProps {
  wallet: string;
}
export const WalletTableItem = ({ wallet }: WalletTableItemProps) => {
  const onCopyAddress = useCallback(() => {
    wallet && navigator.clipboard.writeText(wallet);
    toast.success('Wallet address copied');
  }, [wallet]);

  if (wallet) {
    return (
      <Flex fontSize="12px">
        {wallet}
        <Flex
          height="21px"
          width="100%"
          justifyContent="center"
          alignItems="center"
          onClick={onCopyAddress}
        >
          <Button variant="transparent" marginLeft="-10px">
            <Icon as={FiCopy} height="16px" width="16px" />
          </Button>
        </Flex>
      </Flex>
    );
  }

  return <Flex>Wallet not verified</Flex>;
};
