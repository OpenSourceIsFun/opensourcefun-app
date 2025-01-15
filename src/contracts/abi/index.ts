import { Contract } from 'ethers';
import DistributorNativeFactory from '@/contracts/abi/DistributorNativeFactory.json';
import DistributorNative from '@/contracts/abi/DistributorNative.json';

export const factoryAddress = '0x54F6D01C6750D4B92c0127b273D19DBD500a7cd7';
export const factoryContract = new Contract(
  factoryAddress,
  DistributorNativeFactory.abi,
);

export const distributorAbi = DistributorNative.abi;
