import { TaskMapper } from '@/mapper/task.mapper';
import {
  type Project,
  type TaskFilter,
  type StorageTaskFilter,
  type StorageProject,
} from '@/types/task';

const PROJECTS_KEY = 'todo_app_projects';
const FILTERS_KEY = 'todo_app_filters';

export class TaskRepository {
  public static saveProjects(projects: Project[]): void {
    const storageProjects = projects.map((project) =>
      TaskMapper.projectToStorage(project),
    );
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(storageProjects));
  }

  public static loadProjects(): Project[] {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (!data) return [];

    try {
      const storageProjects: StorageProject[] = JSON.parse(data);
      return storageProjects.map((project) =>
        TaskMapper.projectFromStorage(project),
      );
    } catch (error) {
      console.error('Failed to parse projects from storage', error);
      return [];
    }
  }

  public static saveFilters(filter: TaskFilter): void {
    const storageFilter = TaskMapper.filterToStorage(filter);
    localStorage.setItem(FILTERS_KEY, JSON.stringify(storageFilter));
  }

  public static loadFilters(): TaskFilter {
    const data = localStorage.getItem(FILTERS_KEY);
    if (!data) return { title: '', status: [], tags: [] };

    try {
      const storageFilter: StorageTaskFilter = JSON.parse(data);
      return TaskMapper.filterFromStorage(storageFilter);
    } catch (error) {
      console.error('Failed to parse filters from storage', error);
      return { title: '', status: [], tags: [] };
    }
  }

  public static clearStorage(): void {
    localStorage.removeItem(PROJECTS_KEY);
    localStorage.removeItem(FILTERS_KEY);
  }
}
