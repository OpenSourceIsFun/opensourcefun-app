import { Dispatch, SetStateAction } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { Project } from '@/components/pages/BackOffice/BackOfficePage';
import styled from '@emotion/styled';
import { Separator } from '@/components/common/Separator/Separator';

interface ProjectsTableProps {
  isProjectsLoading: boolean;
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
}

export const ProjectsTable = (props: ProjectsTableProps) => {
  const { projects, selectedProject, setSelectedProject, isProjectsLoading } =
    props;

  return (
    <Flex gap="20px">
      <Flex width="100%">
        <Flex width="100%" direction="column">
          <Flex
            direction="column"
            backgroundColor="#fff"
            borderRadius="10px"
            border="none"
            padding="20px"
            overflow={['scroll', 'scroll', 'scroll', 'scroll', 'hidden']}
          >
            <Flex>
              <Flex
                flexShrink="0"
                gap="10px"
                width={[
                  'fit-content',
                  'fit-content',
                  'fit-content',
                  'fit-content',
                  '100%',
                ]}
                marginLeft="10px"
              >
                <Flex width="420px" flexShrink={0}>
                  Address
                </Flex>
                <Flex width="200px">Title</Flex>
                <Flex width="200px">Network</Flex>
                <Flex width="200px">Alias</Flex>
              </Flex>
            </Flex>
            <Separator />
            {isProjectsLoading ? (
              <Spinner alignSelf="center" />
            ) : (
              <Flex flexDirection="column" gap="5px">
                {projects?.map((project) => (
                  <ProjectsTableItem
                    key={`project-item-${project.id}`}
                    datatype={
                      selectedProject === project ? 'selected' : undefined
                    }
                    onClick={() => setSelectedProject(project)}
                  >
                    <Flex width="420px" flexShrink={0}>
                      {project.address}
                    </Flex>
                    <Flex width="200px" whiteSpace="nowrap">
                      {project.title}
                    </Flex>
                    <Flex width="200px">{project.network}</Flex>
                    <Flex width="200px">{project.alias}</Flex>
                  </ProjectsTableItem>
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const ProjectsTableItem = styled.div`
  display: flex;
  padding: 5px 10px;
  border-radius: 5px;
  gap: 10px;
  flex-shrink: 0;
  width: fit-content;

  &[datatype='selected'],
  :hover {
    background-color: var(--chakra-colors-accent-blue);
    color: #fff;
    cursor: pointer;
  }

  @media (min-width: 1280px) {
    width: 100%;
  }
`;
