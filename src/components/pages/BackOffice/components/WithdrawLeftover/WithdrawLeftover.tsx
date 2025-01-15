import { Button } from '@/components/common/Button';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import { useWithdrawLeftover } from '@/components/pages/BackOffice/components/WithdrawLeftover/WithdrawLeftover.hooks';
import { useEthers } from '@usedapp/core';

interface DepositProps {
  project: Project;
}

export const WithdrawLeftover = ({ project }: DepositProps) => {
  const { account } = useEthers();
  const { withdrawLeftover, loading } = useWithdrawLeftover(project.address);

  return (
    <Button
      variant="primary"
      type="submit"
      width="100%"
      isLoading={loading}
      disabled={!account}
      onClick={withdrawLeftover}
    >
      Withdraw leftover
    </Button>
  );
};
