import { date, object } from 'yup';

export const RegistrationDatesFormSchema = object()
  .shape({
    startDate: date().required('Start date is required'),
    endDate: date().required('End date is required'),
  })
  .required();
