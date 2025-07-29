<script setup lang="ts">
import AppButton from './components/ui/button/AppButton.vue';

import AppParagraph from './components/ui/paragraph/AppParagraph.vue';
import { useTasksStore } from '@/stores/tasks.store';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import TaskList from '@/components/feature/task/TaskList.vue';
import AddSubtaskModal from '@/components/feature/task/AddSubtaskModal.vue';
import EditSubtaskModal from '@/components/feature/task/EditSubtaskModal.vue';
import DeleteTaskModal from '@/components/feature/task/DeleteTaskModal.vue';
import AddTaskModal from '@/components/feature/task/AddTaskModal.vue';
import TaskFilter from '@/components/feature/task/TaskFilter.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import TaskEmptyBlock from '@/components/feature/task/TaskEmptyBlock.vue';
import ExportDataModal from '@/components/feature/task/ExportDataModal.vue';
import ImportDataModal from '@/components/feature/task/ImportDataModal.vue';

const tasksStore = useTasksStore();
const { isTaskEmpty } = storeToRefs(tasksStore);
const { showAddTaskModal, load, showExportDataModal, showImportDataModal } = tasksStore;

onMounted(() => {
  load();
});
</script>

<template>
  <main class="p-20">
    <div class="flex flex-col items-start gap-4 justify-between">
      <div>
        <h2 class="text-black text-3xl font-semibold">Tasks</h2>
        <AppParagraph>
          is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s
        </AppParagraph>
      </div>

      <div class="flex gap-2">
        <AppButton @click="showAddTaskModal">
          <PlusIcon />
          Add
        </AppButton>

        <AppButton @click="showExportDataModal">
          <PlusIcon />
          Export
        </AppButton>

        <AppButton @click="showImportDataModal">
          <PlusIcon />
          Import
        </AppButton>
      </div>
    </div>
    <TaskFilter class="mt-5" />
    <div class="mt-8">
      <h3 class="text-black text-xl font-semibold">Tasks list:</h3>
      <TaskEmptyBlock class="mt-2" v-show="isTaskEmpty" />
      <div class="mt-4 space-y-4">
        <TaskList />
      </div>
    </div>
    <AddSubtaskModal v-once />
    <EditSubtaskModal v-once />
    <DeleteTaskModal v-once />
    <AddTaskModal v-once />
    <ExportDataModal v-once />
    <ImportDataModal v-once />
  </main>
</template>
