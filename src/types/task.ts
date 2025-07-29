export enum TaskStatus {
  todo = 'todo',
  inProgress = 'in-progress',
  done = 'done',
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  tags: string[];
  subtasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StorageTask {
  id: string;
  title: string;
  status: TaskStatus;
  tags: string[];
  subtasks: StorageTask[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

export interface TaskFilter {
  title: string;
  status: TaskStatus[];
  tags: string[];
}

export interface StorageProject {
  id: string;
  name: string;
  tasks: StorageTask[];
}

export type StorageTaskFilter = TaskFilter;
