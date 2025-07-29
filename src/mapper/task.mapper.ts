import {
  type TaskFilter,
  type StorageTaskFilter,
  type StorageTask,
  type Task,
  type StorageProject,
  type Project,
} from '@/types/task';

export class TaskMapper {
  public static toStorage(task: Task): StorageTask {
    return {
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      subtasks: task.subtasks.map((subtask) => this.toStorage(subtask)),
    };
  }

  public static fromStorage(storageTask: StorageTask): Task {
    return {
      ...storageTask,
      createdAt: new Date(storageTask.createdAt),
      updatedAt: new Date(storageTask.updatedAt),
      subtasks: storageTask.subtasks.map((subtask) =>
        this.fromStorage(subtask),
      ),
    };
  }

  public static projectToStorage(project: Project): StorageProject {
    return {
      ...project,
      tasks: project.tasks.map((task) => this.toStorage(task)),
    };
  }

  public static projectFromStorage(storageProject: StorageProject): Project {
    return {
      ...storageProject,
      tasks: storageProject.tasks.map((task) => this.fromStorage(task)),
    };
  }

  public static filterToStorage(filter: TaskFilter): StorageTaskFilter {
    return { ...filter };
  }

  public static filterFromStorage(
    storageFilter: StorageTaskFilter,
  ): TaskFilter {
    return { ...storageFilter };
  }
}
