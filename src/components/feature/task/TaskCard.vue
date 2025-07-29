<template>
  <AppCard
    :class="twMerge('p-5 flex items-center gap-6', props.class)"
    v-if="filteredTaskIds.has(props.task.id)"
  >
    <AppButton
      v-if="isFilterActive === true ? false : task.subtasks.length > 0"
      variant="outline"
      size="icon"
      @click="collapseSubtasks = !collapseSubtasks"
    >
      <ChevronIcon :class="[collapseSubtasks ? 'transform rotate-180' : '']" />
    </AppButton>
    <div class="flex-1">
      <div class="flex justify-between items-center">
        <div class="flex-1">
          <h3 class="text-base font-semibold">{{ props.task.title }}</h3>
        </div>
        <div class="flex gap-1">
          <AppButton @click="showAddSubtaskModal(props.task)" size="icon" variant="outline">
            <PlusIcon /> Subtask
          </AppButton>
          <AppButton @click="showEditTaskModal(props.task)" size="icon">
            <EditIcon />
          </AppButton>
          <AppButton
            @click="showDeleteTaskModal(props.task, props.parentTask, props.project)"
            size="icon"
            variant="destructive"
          >
            <RemoveIcon />
          </AppButton>
        </div>
      </div>
      <AppSelect v-model="props.task.status" class="max-w-44 mt-2">
        <AppSelectOption label="Todo" :value="TaskStatus.todo" />
        <AppSelectOption label="Done" :value="TaskStatus.done" />
        <AppSelectOption label="In-Progress" :value="TaskStatus.inProgress" />
      </AppSelect>
      <TaskCardTagList class="mt-4" :tags="props.task.tags" />
    </div>
  </AppCard>
  <div
    class="pl-8 border-gray-700/20 border-dashed border-l"
    v-show="isFilterActive || collapseSubtasks"
  >
    <TaskCard
      class="mt-5"
      v-for="subtask in task.subtasks"
      :key="task.id"
      :task="subtask"
      :parent-task="props.task"
    />
  </div>
</template>

<script setup lang="ts">
import TaskCardTagList from '@/components/feature/task/TaskCardTagList.vue';
import ChevronIcon from '@/components/icons/ChevronIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import RemoveIcon from '@/components/icons/RemoveIcon.vue';
import AppButton from '@/components/ui/button/AppButton.vue';
import AppCard from '@/components/ui/card/AppCard.vue';
import AppSelect from '@/components/ui/select/AppSelect.vue';
import AppSelectOption from '@/components/ui/select/AppSelectOption.vue';
import { useTasksStore } from '@/stores/tasks.store';
import { TaskStatus, type Project, type Task } from '@/types/task';
import { storeToRefs } from 'pinia';
import { twMerge } from 'tailwind-merge';
import { ref, type HTMLAttributes } from 'vue';

const tasksStore = useTasksStore();
const { filteredTaskIds, isFilterActive } = storeToRefs(tasksStore);
const { showAddSubtaskModal, showEditTaskModal, showDeleteTaskModal } = tasksStore;
const collapseSubtasks = ref(false);

interface Props {
  task: Task;
  class?: HTMLAttributes['class'];
  parentTask?: Task;
  project?: Project;
}

const props = defineProps<Props>();
</script>
