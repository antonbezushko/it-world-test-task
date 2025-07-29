import type { Task } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';

export type CreateTaskParams = Required<Pick<Task, 'status' | 'title'>> &
  Partial<Omit<Task, 'title' | 'status' | 'id'>>;

export const createTask = (createTaskParams: CreateTaskParams): Task => {
  const now = new Date();
  return {
    id: uuidv4(),
    ...createTaskParams,
    tags: createTaskParams?.tags || [],
    subtasks: createTaskParams?.subtasks || [],
    createdAt: now,
    updatedAt: now,
  };
};
