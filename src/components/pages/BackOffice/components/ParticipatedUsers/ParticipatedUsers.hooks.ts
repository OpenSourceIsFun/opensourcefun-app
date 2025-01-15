import { useCallback, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import { convertToCSV } from '@/utils/csv';
import { Project } from '../../BackOfficePage';
import { distributorAbi } from '@/contracts/abi';

export const useGetParticipatedUsers = ({ address, alias }: Project) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const { library } = useEthers();
  const isAvailable = library && address;

  const update = useCallback(async () => {
    setLoading(true);
    const contract = new Contract(address, distributorAbi, library);
    const addresses = await contract.getRegisteredUsers();
    const participants = [];

    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i];
      setProgress(`${i + 1}/${addresses.length}`);
      const isParticipant = (await contract.participations(address))[1];
      if (isParticipant) {
        participants.push(address);
      }
    }

    const csv = convertToCSV(
      JSON.stringify(participants.map((address) => ({ address }))),
    );
    setProgress('');

    const fileName = `${alias}-participants-${new Date().toLocaleDateString()}.csv`;
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

  return { loading, update, progress, isAvailable };
};
