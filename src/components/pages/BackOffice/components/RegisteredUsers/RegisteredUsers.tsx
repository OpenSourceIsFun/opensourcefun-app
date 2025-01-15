import { Button } from '@/components/common/Button';
import { useGetRegisteredUsers } from '@/components/pages/BackOffice/components/RegisteredUsers/RegisteredUsers.hooks';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';

interface RegisteredUsersProps {
  project: Project;
}

export const RegisteredUsers = (props: RegisteredUsersProps) => {
  const { update, loading, isAvailable } = useGetRegisteredUsers(props.project);

  return (
    <Button
      variant="primary"
      onClick={update}
      isLoading={loading}
      disabled={!isAvailable}
    >
      Get registered users
    </Button>
  );
};
