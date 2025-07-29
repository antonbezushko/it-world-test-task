import { v4 as uuidv4 } from 'uuid';
import type { Project } from '@/types/task';

export const createProject = (partialProject?: Partial<Project>): Project => {
  return {
    id: uuidv4(),
    name: partialProject?.name || 'New project',
    tasks: partialProject?.tasks || [],
    ...partialProject,
  };
};
