import { Button } from '@/components/common/Button';
import {
  UserAllocation,
  UserAllocations,
  useSetUsersAllocation,
} from '@/components/pages/BackOffice/components/SetAllocation/SetAllocation.hooks';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';

import { useEthers } from '@usedapp/core';
import { csvToArray } from '@/utils/csv';
import toast from 'react-hot-toast';

import { Input } from '@chakra-ui/react';
import { useCallback } from 'react';
import { parseUnits } from 'ethers/lib/utils';

interface SetAllocationProps {
  project: Project;
}

const FILE_INPUT_ID = 'usersAllocationCsv';

export const SetAllocation = ({ project }: SetAllocationProps) => {
  const { account } = useEthers();
  const { loading, setUsersAllocation } = useSetUsersAllocation(project);

  const onClick = useCallback(async () => {
    const fileInput = document && document.getElementById(FILE_INPUT_ID);
    fileInput && fileInput.click();
  }, []);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const input = e.target;
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          input.value = '';
          const csv = e.target?.result;
          if (typeof csv === 'string') {
            const allocations = (csvToArray(csv) as unknown as UserAllocations)
              .filter(
                (allocation: UserAllocation) =>
                  allocation.user && allocation.amount,
              )
              .map((allocation: UserAllocation) => ({
                ...allocation,
                // TODO load decimals from token contract
                amount: parseUnits(allocation.amount.toString(), 18),
              }));

            if (!allocations.length) {
              toast.error(
                'Allocations need to have "user" and "amount" columns',
              );
              return;
            }

            setUsersAllocation(allocations);
          }
        };
        reader.readAsText(file);
      } catch (e) {
        toast.error('Error parsing CSV file');
        console.log(e);
      }
    },
    [setUsersAllocation],
  );

  return (
    <>
      <Input
        type="file"
        id={FILE_INPUT_ID}
        accept=".csv"
        display="none"
        onChange={onFileChange}
      />
      <Button
        variant="primary"
        loading={loading}
        isLoading={loading}
        onClick={onClick}
        disabled={!account}
      >
        Set users allocation
      </Button>
    </>
  );
};
