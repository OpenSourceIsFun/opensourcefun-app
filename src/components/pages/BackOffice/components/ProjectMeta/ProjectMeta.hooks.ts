import { useCallback, useEffect, useState } from 'react';
import fetchJson from '@/services/fetchJson';
import { API_PROJECTS_BY_ALIAS, API_PROJECTS_BY_ID } from '@/constants/routes';
import { ProjectMetaFormData } from '@/components/pages/BackOffice/components/ProjectMeta/ProjectMeta';

export interface ProjectMeta extends ProjectMetaFormData {
  bannerFile?: string;
  logoFile?: string;
}

export const useProjectMeta = (id?: string, alias?: string) => {
  const [projectMeta, setProjectMeta] = useState<ProjectMeta>();
  const [loading, setLoading] = useState(true);

  const updateState = useCallback(async (id?: string, alias?: string) => {
    if (id) {
      try {
        setLoading(true);
        setProjectMeta(
          await fetchJson<ProjectMeta>(`${API_PROJECTS_BY_ID}/${id}`),
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else if (alias) {
      try {
        setLoading(true);
        setProjectMeta(
          await fetchJson<ProjectMeta>(`${API_PROJECTS_BY_ALIAS}/${alias}`),
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateState(id, alias);
  }, []);

  return {
    projectMeta,
    loading,
  };
};
