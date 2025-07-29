<script setup lang="ts">
import AppButton from '@/components/ui/button/AppButton.vue';
import AppInput from '@/components/ui/input/AppInput.vue';
import AppLabel from '@/components/ui/label/AppLabel.vue';
import AppModal from '@/components/ui/modal/AppModal.vue';
import AppModalContent from '@/components/ui/modal/AppModalContent.vue';
import AppModalDescription from '@/components/ui/modal/AppModalDescription.vue';
import AppModalHeader from '@/components/ui/modal/AppModalHeader.vue';
import AppModalTitle from '@/components/ui/modal/AppModalTitle.vue';
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';

const tasksStore = useTasksStore();

const { exportDataModal } = storeToRefs(tasksStore);
const { downloadExport } = tasksStore;

const secret = ref('');

watchEffect(() => {
  if (exportDataModal.value === false) {
    secret.value = '';
  }
});
</script>

<template>
  <AppModal v-model="exportDataModal" v-slot="{ updateContent }">
    <AppModalContent class="max-w-lg">
      <AppModalHeader>
        <AppModalTitle>Export data</AppModalTitle>
        <AppModalDescription>
          Is simply dummy text of the printing and typesetting industry
        </AppModalDescription>
        <form>
          <div class="space-y-2 my-4">
            <AppLabel>Secret key</AppLabel>
            <AppInput type="password" v-model="secret" />
          </div>
        </form>
        <div class="flex gap-4 justify-end mt-4">
          <AppButton variant="primary" @click="downloadExport(secret)">Export</AppButton>
          <AppButton variant="outline" @click="updateContent(false)">Cancel</AppButton>
        </div>
      </AppModalHeader>
    </AppModalContent>
  </AppModal>
</template>
