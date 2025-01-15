import { Select, SelectProps } from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';

interface FormSelectProps extends SelectProps {
  control?: Control<any, any>;
  children: React.ReactNode;
  defaultValue?: string;
  placeholder?: string;
  fieldName: string;
  hasError?: boolean;
  onChange?: () => void;
}

export const FormSelect = ({
  fieldName,
  defaultValue = '',
  placeholder,
  control,
  hasError,
  children,
  ...rest
}: FormSelectProps) => {
  if (control)
    return (
      <Controller
        name={fieldName}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, ...field } }) => (
          <Select
            height="48px"
            fontWeight="600"
            fontSize="14px"
            lineHeight="21px"
            borderRadius="4px"
            border="none"
            backgroundColor="#fff"
            placeholder={placeholder}
            _disabled={{
              backgroundColor: 'background.gray',
              cursor: 'nor-allowed !important',
            }}
            id={fieldName}
            errorBorderColor={hasError ? 'error' : undefined}
            color={hasError ? 'error' : undefined}
            onChange={onChange}
            {...field}
            {...rest}
            value={field.value}
          >
            {children}
          </Select>
        )}
      />
    );
  return (
    <Select
      height="48px"
      fontWeight="600"
      fontSize="14px"
      lineHeight="21px"
      borderRadius="4px"
      border="none"
      placeholder={placeholder}
      backgroundColor="#fff"
      _disabled={{ backgroundColor: 'background.gray' }}
      id={fieldName}
      errorBorderColor={hasError ? 'error' : undefined}
      color={hasError ? 'error' : undefined}
      {...rest}
    >
      {children}
    </Select>
  );
};
