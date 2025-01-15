import { Button } from '@/components/common/Button';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { useGetParticipatedUsers } from '@/components/pages/BackOffice/components/ParticipatedUsers/ParticipatedUsers.hooks';

interface ParticipatedUsersProps {
  project: Project;
}

export const ParticipatedUsers = (props: ParticipatedUsersProps) => {
  const { update, progress, isAvailable } = useGetParticipatedUsers(
    props.project,
  );

  return (
    <Button variant="primary" onClick={update} disabled={!isAvailable}>
      {progress || 'Get participated users'}
    </Button>
  );
};
