import {
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  InputGroup,
  Spinner,
} from '@chakra-ui/react';
import { FormInput } from '@/components/common/FormInput/FormInput';
import { Button } from '@/components/common/Button';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import {
  useGetDistributionParameters,
  useSetDistributionParameters,
} from './DistributionParameters.hooks';
import { Project } from '../../BackOfficePage';
import { useEthers } from '@usedapp/core';
import { AddressZero } from '@ethersproject/constants';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import { Astar } from '@/providers/dApp';

export interface DistributionParametersData {
  amountToDistribute: string;
  vestingPrecision: string;
  ownerAddress: string;
  tokenAddress: string;
}

interface DistributionParametersProps {
  project: Project;
  callback?: () => Promise<void>;
}

export const DistributionParameters = ({
  project,
}: DistributionParametersProps) => {
  const { account } = useEthers();
  const { loading: isSettingParams, setDistributionParameters } =
    useSetDistributionParameters(project);
  const { distributionParams, loading: isParamsLoading } =
    useGetDistributionParameters(project.address);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DistributionParametersData>();
  const { tokenAddress, ownerAddress, amountToDistribute, vestingPrecision } =
    distributionParams;

  const onSubmit = useCallback(
    async (params: DistributionParametersData) => {
      await setDistributionParameters({
        ...params,
        amountToDistribute: parseUnits(
          params.amountToDistribute,
          Astar.nativeCurrency.decimals,
        ),
      });
    },
    [setDistributionParameters],
  );

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Heading fontSize="20px">Distribution round</Heading>
      <Flex gap="20px" justifyContent="center" alignItems="center">
        {isParamsLoading ? (
          <Spinner marginTop="10px" />
        ) : (
          <Flex width="100%" flexDirection="column" gap="10px">
            <FormControl isInvalid={!!errors.amountToDistribute}>
              <InputGroup>
                <FormInput
                  hasRightElement
                  defaultValue={formatEther(amountToDistribute)}
                  fieldName="amountToDistribute"
                  placeholder="Amount to distribute"
                  control={control}
                />
              </InputGroup>
              {errors.amountToDistribute && (
                <FormErrorMessage
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="18px"
                  color="error"
                >
                  {errors.amountToDistribute.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.vestingPrecision}>
              <InputGroup>
                <FormInput
                  hasRightElement
                  defaultValue={
                    vestingPrecision.toString() === '0'
                      ? '100'
                      : vestingPrecision
                  }
                  fieldName="vestingPrecision"
                  placeholder="Vesting precision"
                  control={control}
                />
              </InputGroup>
              {errors.vestingPrecision && (
                <FormErrorMessage
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="18px"
                  color="error"
                >
                  {errors.vestingPrecision.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.ownerAddress}>
              <InputGroup>
                <FormInput
                  hasRightElement
                  defaultValue={
                    ownerAddress === AddressZero ? '' : ownerAddress
                  }
                  fieldName="ownerAddress"
                  placeholder="Owner address"
                  control={control}
                />
              </InputGroup>
              {errors.ownerAddress && (
                <FormErrorMessage
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="18px"
                  color="error"
                >
                  {errors.ownerAddress.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.tokenAddress}>
              <InputGroup>
                <FormInput
                  hasRightElement
                  defaultValue={
                    tokenAddress === AddressZero ? '' : tokenAddress
                  }
                  fieldName="tokenAddress"
                  placeholder="Token address"
                  control={control}
                />
              </InputGroup>
              {errors.tokenAddress && (
                <FormErrorMessage
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="18px"
                  color="error"
                >
                  {errors.tokenAddress.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <Button
              variant="primary"
              type="submit"
              width="138px"
              alignSelf="flex-end"
              disabled={Object.keys(errors).length > 0 || !account}
            >
              {isSettingParams ? <Spinner /> : 'Save'}
            </Button>
          </Flex>
        )}
      </Flex>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  margin: 35px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
  width: 100%;
`;
