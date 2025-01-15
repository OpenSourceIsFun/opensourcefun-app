import { useCallback, useEffect, useState } from 'react';
import {
  Project,
  ProjectsResponse,
} from '@/components/pages/BackOffice/BackOfficePage';
import { API_PROJECTS_ALL } from '@/constants/routes';
import fetchJson from '@/services/fetchJson';

export const useGetAll = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const update = useCallback(async () => {
    setLoading(true);
    setProjects(await fetchJson<ProjectsResponse>(API_PROJECTS_ALL));
    setLoading(false);
  }, []);

  useEffect(() => {
    update();
  }, []);

  return { projects, loading, update };
};
