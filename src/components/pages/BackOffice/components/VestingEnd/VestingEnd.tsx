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
import { useGetVestingEnd, useSetVestingEnd } from './VestingEnd.hooks';
import { useEthers } from '@usedapp/core';
import { Project } from '../../BackOfficePage';

export interface VestingEndData {
  vestingEnd: string;
}

interface VestingEndProps {
  project: Project;
  callback?: () => Promise<void>;
}

export const VestingEnd = ({ project }: VestingEndProps) => {
  const { account } = useEthers();
  const { loading: isEndLoading, vestingEnd } = useGetVestingEnd(
    project.address,
  );
  const { loading: isEndSetting, setVestingEnd } = useSetVestingEnd(project);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VestingEndData>();

  const loading = isEndLoading || isEndSetting;

  return (
    <StyledForm onSubmit={handleSubmit(setVestingEnd)}>
      <Heading fontSize="20px">Vesting End</Heading>
      <Flex gap="20px" justifyContent="center" alignItems="center">
        {isEndLoading ? (
          <Spinner marginTop="10px" />
        ) : (
          <Flex width="100%" flexDirection="column" gap="10px">
            <FormControl isInvalid={!!errors.vestingEnd}>
              <InputGroup>
                <FormInput
                  hasRightElement
                  defaultValue={vestingEnd}
                  fieldName="vestingEnd"
                  placeholder="Vesting End Date"
                  control={control}
                />
              </InputGroup>
              {errors.vestingEnd && (
                <FormErrorMessage
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="18px"
                  color="error"
                >
                  {errors.vestingEnd.message}
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
