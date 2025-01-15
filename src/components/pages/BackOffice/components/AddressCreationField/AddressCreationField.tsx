import {
  Flex,
  FormControl,
  FormErrorMessage,
  InputGroup,
  Spinner,
} from '@chakra-ui/react';
import { FormInput } from '@/components/common/FormInput/FormInput';
import { Button } from '@/components/common/Button';
import { useDeployNewContract } from './AddressCreationField.hooks';
import { useEthers } from '@usedapp/core';
import { Control, FieldErrorsImpl, useFormContext } from 'react-hook-form';

interface AddressCreationFieldProps {
  control?: Control<any, any>;
  defaultValue?: string;
  errors: FieldErrorsImpl<{
    title: string;
    description: string;
    alias: string;
    network: string;
    address: string;
  }>;
}

export const AddressCreationField = (props: AddressCreationFieldProps) => {
  const { account } = useEthers();
  const { setValue } = useFormContext();
  const { errors, control, defaultValue } = props;
  const { loading: isContractDeploying, deployContract } = useDeployNewContract(
    (newAddress) => setValue('address', newAddress, { shouldValidate: true }),
  );

  return (
    <Flex>
      <FormControl isInvalid={!!errors.address}>
        <InputGroup>
          <FormInput
            hasRightElement
            fieldName="address"
            defaultValue={defaultValue}
            placeholder="Address"
            width="100%"
            cursor={isContractDeploying ? 'not-allowed' : 'auto'}
            control={control}
            isDisabled={isContractDeploying}
            hasError={!!errors.address}
          />
        </InputGroup>
        {errors.address && !isContractDeploying && (
          <FormErrorMessage
            fontWeight="400"
            fontSize="12px"
            lineHeight="18px"
            color="error"
          >
            {errors.address.message}
          </FormErrorMessage>
        )}
      </FormControl>
      <Button
        variant="primary"
        type="submit"
        width="138px"
        marginLeft="10px"
        onClick={deployContract}
        disabled={!account}
      >
        {isContractDeploying ? <Spinner /> : 'New contract'}
      </Button>
    </Flex>
  );
};
