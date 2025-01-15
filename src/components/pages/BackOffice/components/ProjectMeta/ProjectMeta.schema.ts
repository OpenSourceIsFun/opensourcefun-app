import { object, string } from 'yup';
import { isAddress } from '@ethersproject/address';

export const ProjectMetaSchema = object()
  .shape({
    address: string().test(
      'is-address',
      'Address is invalid',
      (value) => !value || isAddress(value),
    ),
    title: string().required('Title is required'),
    alias: string().required('Alias is required'),
    network: string().required('Network is required'),
    token: string().required('Token is required'),
  })
  .required();
