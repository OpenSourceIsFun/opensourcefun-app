import styled from '@emotion/styled';
import { Control, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatepickerProps {
  name: string;
  control: Control<any, any>;
  defaultValue: Date | null;
}

export const Datepicker = (props: DatepickerProps) => {
  const { control, name, defaultValue } = props;

  const onDateChange = (onChange: (value: Date) => void) => (value: Date) => {
    onChange(value);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <DatepickerContainer>
          <DatePicker
            selected={value}
            showTimeInput
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd.MM.yyyy HH:mm"
            onChange={onDateChange(onChange)}
          />
        </DatepickerContainer>
      )}
    />
  );
};

const DatepickerContainer = styled.div`
  min-width: 112px;
  width: 100%;
  font-size: 12px;

  @media (min-width: 400px) {
    min-width: 142px;
    font-size: 14px;
  }

  @media (min-width: 450px) {
    font-size: 16px;
  }
`;
