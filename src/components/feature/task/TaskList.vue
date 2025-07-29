<template>
  <div v-for="project in projects" :key="project.id">
    <h3 v-if="hasFilteredTasks(project)" class="text-lg">{{ project.name }}</h3>
    <TaskCard
      class="mt-4"
      v-for="task in project.tasks"
      :project="project"
      :task="task"
      :key="task.id"
    />
  </div>
</template>

<script setup lang="ts">
import TaskCard from '@/components/feature/task/TaskCard.vue';
import { useTasksStore } from '@/stores/tasks.store';
import type { Project } from '@/types/task';
import { storeToRefs } from 'pinia';

const tasksStore = useTasksStore();

const { projects, filteredTaskIds } = storeToRefs(tasksStore);

const hasFilteredTasks = (project: Project) => {
  return project.tasks.some((task) => filteredTaskIds.value.has(task.id));
};
</script>
