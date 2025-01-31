import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
} from '@chakra-ui/react';
import { FormInput } from '@/components/common/FormInput/FormInput';
import { PasswordButton } from '@/components/common/PasswordControl/components/PasswordButton/PasswordButton';
import { Control, FieldError } from 'react-hook-form';
import { PasswordTypes } from './PasswordControl.constants';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { RequirementsItem } from '@/components/common/PasswordControl/components/RequirementsItem/RequirementsItem';
import { useIsMobile } from '@/hooks/useIsMobile';

interface PasswordControlProps {
  control: Control<any, any>;
  name: string;
  text: string;
  error?: FieldError;
  withRequirements?: boolean;
  passwordType: PasswordTypes;
  setPasswordType: Dispatch<SetStateAction<PasswordTypes>>;
}

export const PasswordControl = (props: PasswordControlProps) => {
  const {
    error,
    control,
    passwordType,
    setPasswordType,
    name,
    text,
    withRequirements = false,
  } = props;

  const isMobile = useIsMobile();

  const [lengthColor, setLengthColor] = useState('primary.basicTransparent');
  const [caseColor, setCaseColor] = useState('primary.basicTransparent');
  const [numbersColor, setNumbersColor] = useState('primary.basicTransparent');

  const updateRequirements = useCallback(({ target: { value } }) => {
    if (!value.length) {
      setLengthColor('primary.basicTransparent');
    } else if (value.length < 8) {
      setLengthColor('error');
    } else {
      setLengthColor('accent.blue');
    }

    if (!value.length) {
      setCaseColor('primary.basicTransparent');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
      setCaseColor('error');
    } else {
      setCaseColor('accent.blue');
    }

    if (!value.length) {
      setNumbersColor('primary.basicTransparent');
    } else if (!/^(?=.*[0-9])/.test(value)) {
      setNumbersColor('error');
    } else {
      setNumbersColor('accent.blue');
    }
  }, []);

  return (
    <FormControl isInvalid={!!error} onChange={updateRequirements}>
      <FormLabel htmlFor={name}>{text}</FormLabel>
      <InputGroup>
        <FormInput
          hasRightElement
          fieldName={name}
          control={control}
          hasError={!!error}
          fieldType={passwordType}
        />
        <PasswordButton
          error={error}
          passwordType={passwordType}
          setPasswordType={setPasswordType}
        />
      </InputGroup>
      {withRequirements && (
        <Flex marginTop="16px" flexDirection={isMobile ? 'column' : 'row'}>
          <RequirementsItem text="8 characters" color={lengthColor} />
          <RequirementsItem text="Uppercase & lowercase" color={caseColor} />
          <RequirementsItem text="Numbers" color={numbersColor} />
        </Flex>
      )}
      {error && (
        <FormErrorMessage
          fontWeight="400"
          fontSize="12px"
          lineHeight="18px"
          color="error"
        >
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
