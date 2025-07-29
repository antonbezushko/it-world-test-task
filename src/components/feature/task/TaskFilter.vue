<script setup lang="ts">
import TaskTag from '@/components/feature/task/TaskTag.vue';
import AppCard from '@/components/ui/card/AppCard.vue';
import AppInput from '@/components/ui/input/AppInput.vue';
import AppLabel from '@/components/ui/label/AppLabel.vue';
import { useTasksStore } from '@/stores/tasks.store';
import { TaskStatus } from '@/types/task';
import { storeToRefs } from 'pinia';

const taskStore = useTasksStore();

const { taskFilter, availableTags } = storeToRefs(taskStore);

function addTag(tag: string) {
  const index = taskFilter.value.tags.findIndex((t) => t == tag);
  if (index != -1) {
    taskFilter.value.tags.splice(index, 1);
  } else {
    taskFilter.value.tags.push(tag);
  }
}

function addStatus(status: TaskStatus) {
  const index = taskFilter.value.status.findIndex((s) => s == status);
  if (index != -1) {
    taskFilter.value.status.splice(index, 1);
  } else {
    taskFilter.value.status.push(status);
  }
}
</script>

<template>
  <AppCard class="p-5">
    <h2 class="text-lg font-semibold">Filters & Search</h2>
    <div class="space-y-4">
      <div class="space-y-2 mt-6">
        <AppLabel>Search</AppLabel>
        <AppInput v-model="taskFilter.title" placeholder="Search by title..." />
      </div>
      <div class="space-y-2 mt-6">
        <AppLabel> Filter by tags</AppLabel>
        <div class="flex gap-2">
          <TaskTag
            v-for="tag in availableTags"
            :key="tag"
            class="cursor-pointer"
            :selected="taskFilter.tags.includes(tag)"
            @click="addTag(tag)"
          >
            {{ tag }}
          </TaskTag>
        </div>
      </div>
      <div class="space-y-2 mt-6">
        <AppLabel>Filter by status </AppLabel>
        <div class="flex gap-2">
          <TaskTag
            v-for="(status, i) in TaskStatus"
            :key="i"
            class="cursor-pointer"
            :selected="taskFilter.status.includes(status)"
            @click="addStatus(status)"
          >
            {{ status }}
          </TaskTag>
        </div>
      </div>
    </div>
  </AppCard>
</template>
