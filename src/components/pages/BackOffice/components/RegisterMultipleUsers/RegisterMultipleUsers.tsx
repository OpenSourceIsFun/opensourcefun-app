import { Button } from '@/components/common/Button';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';

import { useEthers } from '@usedapp/core';
import { csvToArray } from '@/utils/csv';
import toast from 'react-hot-toast';

import { Input } from '@chakra-ui/react';
import { useCallback } from 'react';
import {
  RegisteredUser,
  RegisteredUsers,
  useRegisterMultipleUsers,
} from '@/components/pages/BackOffice/components/RegisterMultipleUsers/RegisterMultipleUsers.hooks';

interface RegisterMultipleUsersProps {
  project: Project;
}

const FILE_INPUT_ID = 'registeredUsersCsv';

export const RegisterMultipleUsers = ({
  project,
}: RegisterMultipleUsersProps) => {
  const { account } = useEthers();
  const { loading, registerMultipleUsers } = useRegisterMultipleUsers(project);

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
            const users = (csvToArray(csv) as unknown as RegisteredUsers)
              .filter((user: RegisteredUser) => user.address)
              .map((user) => user.address);

            if (!users.length) {
              toast.error('Registered users need to have "address" column');
              return;
            }

            registerMultipleUsers(users);
          }
        };
        reader.readAsText(file);
      } catch (e) {
        toast.error('Error parsing CSV file');
        console.log(e);
      }
    },
    [registerMultipleUsers],
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
        Register multiple users
      </Button>
    </>
  );
};
