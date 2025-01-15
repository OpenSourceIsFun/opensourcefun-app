import { useCallback, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import fetchJson from '@/services/fetchJson';
import { convertToCSV } from '@/utils/csv';
import { API_USERS_BY_ADDRESSES } from '@/constants/routes';
import { Project } from '../../BackOfficePage';
import { distributorAbi } from '@/contracts/abi';

const headers = {
  email: 'Email',
  telegram: 'Telegram',
  discord: 'Discord',
  twitter: 'Twitter',
  address: 'Address',
};

export const useGetRegisteredUsers = ({ address, alias }: Project) => {
  const [loading, setLoading] = useState(false);
  const { library } = useEthers();
  const isAvailable = library && address;

  const update = useCallback(async () => {
    setLoading(true);
    const contract = new Contract(address, distributorAbi, library);

    const addresses = await contract.getRegisteredUsers();

    const users: object[] = await fetchJson(API_USERS_BY_ADDRESSES, {
      method: 'POST',
      body: JSON.stringify({ addresses }),
    });
    const csv = convertToCSV(JSON.stringify([headers, ...users]));

    const fileName = `${alias}-users-${new Date().toLocaleDateString()}.csv`;
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setLoading(false);
  }, [address, alias, library]);

  return { loading, update, isAvailable };
};
