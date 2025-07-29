<script setup lang="ts">
import AppButton from '@/components/ui/button/AppButton.vue';
import AppModal from '@/components/ui/modal/AppModal.vue';
import AppModalContent from '@/components/ui/modal/AppModalContent.vue';
import AppModalDescription from '@/components/ui/modal/AppModalDescription.vue';
import AppModalHeader from '@/components/ui/modal/AppModalHeader.vue';
import AppModalTitle from '@/components/ui/modal/AppModalTitle.vue';
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';

const tasksStore = useTasksStore();

const { deleteTaskModal } = storeToRefs(tasksStore);
const { deleteTask } = tasksStore;
</script>

<template>
  <AppModal v-slot="{ updateContent }" v-model="deleteTaskModal">
    <AppModalContent class="max-w-lg">
      <AppModalHeader>
        <AppModalTitle>Add new subtask</AppModalTitle>
        <AppModalDescription>
          Is simply dummy text of the printing and typesetting industry
        </AppModalDescription>
        <div class="flex gap-4 justify-end mt-4">
          <AppButton variant="destructive" @click="deleteTask"
            >Delete</AppButton
          >
          <AppButton variant="outline" @click="updateContent(false)"
            >Cancel</AppButton
          >
        </div>
      </AppModalHeader>
    </AppModalContent>
  </AppModal>
</template>
