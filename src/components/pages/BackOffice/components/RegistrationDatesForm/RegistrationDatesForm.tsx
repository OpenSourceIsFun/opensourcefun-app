import { Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { Datepicker } from '@/components/common/DatePicker/Datepicker';
import { Button } from '@/components/common/Button';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Project } from '../../BackOfficePage';
import { RegistrationDatesFormSchema } from '@/components/pages/BackOffice/components/RegistrationDatesForm/RegistrationDatesForm.schema';
import { Round, useGetRegistrationRound } from '@/hooks/contracts';
import { useSetRegistrationRound } from './RegistrationDatesForm.hooks';
import { useEthers } from '@usedapp/core';

interface RegistrationDatesFormProps {
  project: Project;
  callback: () => void;
}

export const RegistrationDatesForm = (props: RegistrationDatesFormProps) => {
  const { account } = useEthers();
  const { loading: isDatesLoading, registrationRound } =
    useGetRegistrationRound(props.project.address);
  const { loading: isDatesUpdating, setRegistrationRound } =
    useSetRegistrationRound(props.project, props.callback);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Round>({
    resolver: yupResolver(RegistrationDatesFormSchema),
  });

  const { startDate, endDate } = registrationRound;
  const isNotSet = !startDate && !endDate;

  return (
    <StyledForm onSubmit={handleSubmit(setRegistrationRound)}>
      <Heading fontSize="20px">Registration round</Heading>
      <Flex gap="20px" justifyContent="center" alignItems="center">
        {isDatesLoading ? (
          <Spinner marginTop="10px" />
        ) : (
          <Flex flexDirection="column" width="100%">
            <Flex gap="10px">
              <Datepicker
                name="startDate"
                control={control}
                defaultValue={startDate}
              />
              <Datepicker
                name="endDate"
                control={control}
                defaultValue={endDate}
              />
              <Button
                variant="primary"
                type="submit"
                minWidth="90px"
                disabled={Object.keys(errors).length > 0 || !account}
              >
                {isDatesUpdating ? <Spinner /> : 'Set dates'}
              </Button>
            </Flex>
            {isNotSet && (
              <Text
                padding="10px 0"
                fontWeight="400"
                fontSize="14px"
                lineHeight="18px"
                color="error"
              >
                Set the registration dates to activate the claim
              </Text>
            )}
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
