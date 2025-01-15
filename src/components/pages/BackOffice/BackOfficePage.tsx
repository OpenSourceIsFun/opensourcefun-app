import { useRouter } from 'next/router';
import { HOME_ROUTE } from '@/constants/routes';
import { Flex, Heading } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { RegistrationDatesForm } from './components/RegistrationDatesForm/RegistrationDatesForm';
import { ProjectMeta } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta';
import { useGetAll } from '@/components/pages/BackOffice/BackOfficePage.hooks';
import { RegisteredUsers } from '@/components/pages/BackOffice/components/RegisteredUsers/RegisteredUsers';
import { DistributionDatesForm } from '@/components/pages/BackOffice/components/DistributionDatesForm/DistributionDatesForm';
import { DistributionParameters } from '@/components/pages/BackOffice/components/DistributionParameters/DistributionParameters';
import useUser from '@/hooks/useUser';
import { Loading } from '@/components/common/Loading/Loading';
import { VestingParameters } from '@/components/pages/BackOffice/components/VestingParameters/VestingParameters';
import { VestingEnd } from '@/components/pages/BackOffice/components/VestingEnd/VestingEnd';
import { ProjectsTable } from '@/components/pages/BackOffice/components/ProjectsTable/ProjectsTable';
import { SetAllocation } from '@/components/pages/BackOffice/components/SetAllocation/SetAllocation';
import { Deposit } from '@/components/pages/BackOffice/components/Deposit/Deposit';
import { Button } from '@/components/common/Button';
import { RegisterMultipleUsers } from '@/components/pages/BackOffice/components/RegisterMultipleUsers/RegisterMultipleUsers';
import { ParticipatedUsers } from '@/components/pages/BackOffice/components/ParticipatedUsers/ParticipatedUsers';
import { ClaimedUsers } from '@/components/pages/BackOffice/components/ClaimedUsers/ClaimedUsers';
import { WithdrawLeftover } from './components/WithdrawLeftover/WithdrawLeftover';

export interface Project {
  id: string;
  address: string;
  alias: string;
  network: string;
  title: string;
}

export type ProjectsResponse = {
  id: string;
  title: string;
  alias: string;
  network: string;
  address: string;
}[];

export const INITIAL_PROJECT: Project = {
  id: '',
  address: '',
  alias: '',
  network: '',
  title: '',
};

export const BackOfficePage = () => {
  const { isAdmin, isLoading } = useUser();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects, loading: isProjectsLoading, update } = useGetAll();

  const onNewProjectClick = useCallback(() => {
    setSelectedProject(INITIAL_PROJECT);
  }, []);

  // const onContractCreate = useCallback(
  //   async (address?: string) => {
  //     await update();
  //     setSelectedSale({
  //       ...selectedProject,
  //       address,
  //     } as Sale);
  //   },
  //   [selectedProject, update],
  // );

  const onMetaCreate = useCallback(
    async (id?: string) => {
      await update();
      setSelectedProject({
        ...selectedProject,
        id,
      } as Project);
    },
    [selectedProject, update],
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!isAdmin) {
    router.push(HOME_ROUTE);
    return <Loading />;
  }

  return (
    <Flex
      flexDirection={'column'}
      padding={['50px 16px', '50px 24px', '50px 32px', '50px 100px']}
    >
      <Heading marginBottom="40px" fontSize="40px">
        Back Office
      </Heading>
      <Button
        variant="primary"
        type="submit"
        onClick={onNewProjectClick}
        width="120px"
        marginBottom="20px"
      >
        New project
      </Button>
      <ProjectsTable
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        isProjectsLoading={isProjectsLoading}
      />
      {selectedProject && (
        <Flex
          width="100%"
          marginTop="20px"
          gap="50px"
          flexDirection={['column', 'column', 'column', 'column', 'row']}
        >
          <Flex
            width={['100%', '100%', '100%', '100%', '50%']}
            flexDirection="column"
          >
            <Heading fontSize="32px">Meta</Heading>
            <ProjectMeta
              key={`project-meta-${selectedProject.id}`}
              project={selectedProject}
              callback={onMetaCreate}
            />
          </Flex>
          {selectedProject.address && selectedProject.id && (
            <Flex
              width={['100%', '100%', '100%', '100%', '50%']}
              flexDirection="column"
            >
              <Heading fontSize="32px">Contract</Heading>
              <RegistrationDatesForm
                key={`date-form-${selectedProject.id}`}
                project={selectedProject}
                callback={update}
              />
              <Flex
                marginTop="20px"
                gap="20px"
                flexDirection={['column', 'column', 'row']}
              >
                <RegisteredUsers project={selectedProject} />
                <SetAllocation project={selectedProject} />
                <RegisterMultipleUsers project={selectedProject} />
              </Flex>
              <Flex
                marginTop="20px"
                gap="20px"
                flexDirection={['column', 'column', 'row']}
              >
                <ParticipatedUsers project={selectedProject} />
                <ClaimedUsers project={selectedProject} />
              </Flex>
              <DistributionParameters
                key={`dist-param-${selectedProject.id}`}
                project={selectedProject}
              />
              <DistributionDatesForm
                key={`dist-dates-${selectedProject.id}`}
                project={selectedProject}
                callback={() => null}
              />
              <Flex gap="20px" marginTop="20px">
                <Deposit project={selectedProject} />
                <WithdrawLeftover project={selectedProject} />
              </Flex>
              <VestingParameters
                key={`vest-param-${selectedProject.id}`}
                project={selectedProject}
              />
              <VestingEnd
                key={`vest-end-${selectedProject.id}`}
                project={selectedProject}
              />
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};
