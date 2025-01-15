import { Button } from '@/components/common/Button';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { useGetClaimedUsers } from '@/components/pages/BackOffice/components/ClaimedUsers/ClaimedUsers.hooks';

interface ClaimedUsersProps {
  project: Project;
}

export const ClaimedUsers = (props: ClaimedUsersProps) => {
  const { update, progress, isAvailable } = useGetClaimedUsers(props.project);

  return (
    <Button variant="primary" onClick={update} disabled={!isAvailable}>
      {progress || 'Get claimed users'}
    </Button>
  );
};
