import { date, object } from 'yup';

export const DistributionDatesFormSchema = object()
  .shape({
    startDate: date().required('Start date is required'),
    endDate: date().required('End date is required'),
  })
  .required();
