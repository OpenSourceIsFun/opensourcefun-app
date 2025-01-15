import { Button } from '@/components/common/Button';
import { useDepositTokens } from '@/components/pages/BackOffice/components/Deposit/Deposit.hooks';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { useEthers } from '@usedapp/core';

interface DepositProps {
  project: Project;
}

export const Deposit = ({ project }: DepositProps) => {
  const { account } = useEthers();
  const { depositTokens, loading } = useDepositTokens(project.address);

  return (
    <Button
      variant="primary"
      type="submit"
      width="100%"
      disabled={!account}
      isLoading={loading}
      onClick={depositTokens}
    >
      Deposit tokens
    </Button>
  );
};
