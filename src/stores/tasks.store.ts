import { createProject } from '@/factories/project.factory';
import { createTask, type CreateTaskParams } from '@/factories/taks.factory';
import { TaskMapper } from '@/mapper/task.mapper';
import { TaskRepository } from '@/repository/task.repository';
import { CryptoService } from '@/service/crypto.service';
import {
  type Project,
  type StorageProject,
  type Task,
  type TaskFilter,
} from '@/types/task';
import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
  let parentTaskForSubtask: Task | null = null;

  const projects = ref<Project[]>([]);
  const currentProjectId = ref<Project['id'] | null>(null);

  const taskFilter = reactive<TaskFilter>({
    status: [],
    tags: [],
    title: '',
  });

  const tasks = computed(() => {
    const result: Task[] = [];

    const collectTasks = (tasks: Task[]) => {
      tasks.forEach((task) => {
        result.push(task);
        if (task.subtasks?.length) {
          collectTasks(task.subtasks);
        }
      });
    };

    projects.value.forEach((project) => {
      collectTasks(project.tasks);
    });

    return result;
  });

  const availableTags = computed(() => {
    const tags = new Set<string>();

    const collectTags = (tasks: Task[]) => {
      tasks.forEach((task) => {
        task.tags.forEach((tag) => tags.add(tag));

        if (task.subtasks?.length) {
          collectTags(task.subtasks);
        }
      });
    };

    collectTags(tasks.value);

    return Array.from(tags);
  });

  watch(availableTags, (newATags) => {
    taskFilter.tags = taskFilter.tags.filter((t) => newATags.includes(t));
  });

  const filteredTaskIds = computed(() => {
    const ids = new Set<string>();

    const collectIds = (tasks: Task[]) => {
      tasks.forEach((task) => {
        const statusMatch =
          taskFilter.status.length === 0 ||
          taskFilter.status.includes(task.status);
        const tagsMatch =
          taskFilter.tags.length === 0 ||
          taskFilter.tags.every((tag) => task.tags.includes(tag));
        const titleMatch =
          !taskFilter.title || task.title.includes(taskFilter.title);

        if (statusMatch && tagsMatch && titleMatch) {
          ids.add(task.id);
        }

        if (task.subtasks?.length) {
          collectIds(task.subtasks);
        }
      });
    };

    collectIds(tasks.value);
    return ids;
  });

  const isFilterActive = computed(() => {
    return (
      taskFilter.tags.length !== 0 ||
      taskFilter.status.length !== 0 ||
      taskFilter.title.length !== 0
    );
  });

  const isTaskEmpty = computed(() => {
    return (
      (isFilterActive.value && filteredTaskIds.value.size === 0) ||
      tasks.value.length === 0
    );
  });

  const addTaskModal = ref(false);
  const subTaskModal = ref(false);
  const editTaskModal = ref(false);
  const deleteTaskModal = ref(false);
  const exportDataModal = ref(false);
  const importDataModal = ref(false);

  const editTask = ref<Task | null>(null);

  let editTaskRef: Task | null = null;
  let deleteTaskRef: Task | null = null;
  let deleteTaskParentRef: Task | null = null;
  let deleteTaskProjectParentRef: Project | null = null;

  function addTask(createTaskParams: CreateTaskParams) {
    if (currentProjectId.value) {
      const newTask = createTask(createTaskParams);
      projects.value
        .find((p) => p.id === currentProjectId.value)
        ?.tasks.push(newTask);
    }
    addTaskModal.value = false;
  }

  function showAddSubtaskModal(parentTask: Task) {
    parentTaskForSubtask = parentTask;
    subTaskModal.value = true;
  }

  function showEditTaskModal(task: Task) {
    editTask.value = task;
    editTaskRef = task;
    editTaskModal.value = true;
  }

  function showDeleteTaskModal(
    task: Task,
    parentTask?: Task,
    parentProject?: Project,
  ) {
    deleteTaskModal.value = true;
    deleteTaskParentRef = parentTask || null;
    deleteTaskProjectParentRef = parentProject || null;
    deleteTaskRef = task;
  }

  function showAddTaskModal() {
    addTaskModal.value = true;
  }

  function showExportDataModal() {
    exportDataModal.value = true;
  }

  function showImportDataModal() {
    importDataModal.value = true;
  }

  function addSubTask(createTaskParams: CreateTaskParams) {
    console.log(createTaskParams);

    if (!parentTaskForSubtask) {
      console.warn('You need to set parent task');
      return;
    }
    const newTask = createTask(createTaskParams);
    parentTaskForSubtask.subtasks.push(newTask);
    subTaskModal.value = false;
  }

  function updateTask(updatedTask: Partial<Task>) {
    if (editTaskRef) {
      Object.assign(editTaskRef, updatedTask);
    }
    editTaskModal.value = false;
  }

  function deleteTask() {
    if (deleteTaskRef) {
      if (deleteTaskParentRef) {
        const index = deleteTaskParentRef.subtasks.findIndex(
          (task) => task.id === deleteTaskRef?.id,
        );
        if (index !== -1) {
          deleteTaskParentRef.subtasks.splice(index, 1);
        }
      } else {
        if (deleteTaskProjectParentRef) {
          const index = deleteTaskProjectParentRef.tasks.findIndex(
            (task) => task.id === deleteTaskRef?.id,
          );
          if (index !== -1) {
            deleteTaskProjectParentRef.tasks.splice(index, 1);
          }
        } else {
          console.warn('Need to set parent project to find element to remove');
          return;
        }
      }
      deleteTaskRef = null;
      deleteTaskParentRef = null;
      deleteTaskModal.value = false;
    }
  }

  function addProject(name: Project['name']) {
    const newProject = createProject({ name });
    projects.value.push(newProject);
    currentProjectId.value = newProject.id;
  }

  function load() {
    projects.value = TaskRepository.loadProjects();
    Object.assign(TaskRepository.loadFilters());
  }

  watch(
    projects,
    (newProjects) => {
      TaskRepository.saveProjects(newProjects);
    },
    { deep: true },
  );

  watch(
    taskFilter,
    (newFilter) => {
      TaskRepository.saveFilters(newFilter);
    },
    { deep: true },
  );

  const exportData = (
    secret: string,
  ): { success: boolean; error?: string; data?: string } => {
    try {
      const dataToExport = {
        projects: projects.value,
        version: '1.0',
        exportedAt: new Date().toISOString(),
      };

      const jsonData = JSON.stringify(dataToExport);
      const encryptedData = CryptoService.encrypt(jsonData, secret);

      return { success: true, data: encryptedData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const downloadExport = (secret: string): boolean => {
    const result = exportData(secret);
    if (!result.success || !result.data) return false;

    const blob = new Blob([result.data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks_export_${new Date().toISOString().split('T')[0]}.enc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    exportDataModal.value = false;
    return true;
  };

  function importData(encryptedData: string, secret: string) {
    if (!CryptoService.validateEncryptedData(encryptedData, secret)) {
      throw new Error('Incorrect password or invalid data');
    }

    try {
      const decrypted = CryptoService.decrypt(encryptedData, secret);
      const data = JSON.parse(decrypted);

      if (!data.projects || !Array.isArray(data.projects)) {
        throw new Error('Incorrect data format');
      }
      projects.value = data.projects.map((p: StorageProject) =>
        TaskMapper.projectFromStorage(p),
      );
    } catch {
      throw new Error('Incorrect data format');
    }

    importDataModal.value = false;
    return { success: true };
  }

  return {
    tasks,
    addTask,
    subTaskModal,
    showAddSubtaskModal,
    addProject,
    showEditTaskModal,
    addSubTask,
    deleteTask,
    availableTags,
    editTask,
    importDataModal,
    editTaskModal,
    updateTask,
    deleteTaskModal,
    showDeleteTaskModal,
    addTaskModal,
    showAddTaskModal,
    taskFilter,
    filteredTaskIds,
    isFilterActive,
    load,
    isTaskEmpty,
    projects,
    currentProjectId,
    exportData,
    downloadExport,
    showExportDataModal,
    importData,
    exportDataModal,
    showImportDataModal,
  };
});
