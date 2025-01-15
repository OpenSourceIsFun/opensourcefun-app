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
import {
  useGetVestingParameters,
  useSetVestingParameters,
} from './VestingParameters.hooks';
import { useEthers } from '@usedapp/core';
import { Project } from '../../BackOfficePage';

export interface VestingParametersData {
  unlockingTimes: string;
  percents: string;
}

interface VestingParametersProps {
  project: Project;
  callback?: () => Promise<void>;
}

export const VestingParameters = ({ project }: VestingParametersProps) => {
  const { account } = useEthers();
  const { loading: isParamsLoading, vestingParams } = useGetVestingParameters(
    project.address,
  );
  const { loading: isParamsSetting, setVestingParameters } =
    useSetVestingParameters(project);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VestingParametersData>();

  const loading = isParamsLoading || isParamsSetting;

  return (
    <StyledForm onSubmit={handleSubmit(setVestingParameters)}>
      <Heading fontSize="20px">Vesting parameters</Heading>
      <Flex gap="20px" justifyContent="center" alignItems="center">
        {isParamsLoading ? (
          <Spinner marginTop="10px" />
        ) : (
          <Flex width="100%" flexDirection="column" gap="10px">
            <FormControl isInvalid={!!errors.unlockingTimes}>
              <InputGroup>
                <FormInput
                  hasRightElement
                  defaultValue={vestingParams?.unlockingTimes.join(', ')}
                  fieldName="unlockingTimes"
                  placeholder="Unlocking times"
                  control={control}
                />
              </InputGroup>
              {errors.unlockingTimes && (
                <FormErrorMessage
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="18px"
                  color="error"
                >
                  {errors.unlockingTimes.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.percents}>
              <InputGroup>
                <FormInput
                  hasRightElement
                  defaultValue={vestingParams?.percents.join(', ')}
                  fieldName="percents"
                  placeholder="Percents"
                  control={control}
                />
              </InputGroup>
              {errors.percents && (
                <FormErrorMessage
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="18px"
                  color="error"
                >
                  {errors.percents.message}
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
              {loading ? <Spinner /> : 'Save'}
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
