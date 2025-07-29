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

const { importDataModal } = storeToRefs(tasksStore);

const secret = ref('');
const file = ref<File | null>(null);

watchEffect(() => {
  if (importDataModal.value === false) {
    secret.value = '';
  }
});

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  file.value = target.files?.[0] || null;
};

const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const handleImport = async () => {
  if (!file.value || !secret.value) return;

  const fileContent = await readFileAsText(file.value);
  tasksStore.importData(fileContent, secret.value);
};
</script>

<template>
  <AppModal v-model="importDataModal" v-slot="{ updateContent }">
    <AppModalContent class="max-w-lg">
      <AppModalHeader>
        <AppModalTitle>Import data</AppModalTitle>
        <AppModalDescription>
          Is simply dummy text of the printing and typesetting industry
        </AppModalDescription>
        <form>
          <div class="space-y-2 my-4">
            <AppLabel>File</AppLabel>
            <AppInput type="file" @change="handleFileChange" />
          </div>
          <div class="space-y-2 my-4">
            <AppLabel>Secret key</AppLabel>
            <AppInput type="password" v-model="secret" />
          </div>
        </form>
        <div class="flex gap-4 justify-end mt-4">
          <AppButton variant="primary" @click="handleImport">Export</AppButton>
          <AppButton variant="outline" @click="updateContent(false)">Cancel</AppButton>
        </div>
      </AppModalHeader>
    </AppModalContent>
  </AppModal>
</template>
