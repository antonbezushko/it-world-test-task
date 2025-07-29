<script setup lang="ts">
import AppButton from '@/components/ui/button/AppButton.vue';
import ErrorMessage from '@/components/ui/form/ErrorMessage.vue';
import AppInput from '@/components/ui/input/AppInput.vue';
import AppLabel from '@/components/ui/label/AppLabel.vue';
import AppModal from '@/components/ui/modal/AppModal.vue';
import AppModalContent from '@/components/ui/modal/AppModalContent.vue';
import AppModalDescription from '@/components/ui/modal/AppModalDescription.vue';
import AppModalHeader from '@/components/ui/modal/AppModalHeader.vue';
import AppModalTitle from '@/components/ui/modal/AppModalTitle.vue';
import { useFormValidation } from '@/composables/form/useFormValidation';
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import { reactive, watchEffect } from 'vue';

const tasksStore = useTasksStore();

const { importDataModal } = storeToRefs(tasksStore);
const { importData } = tasksStore;

const formData = reactive({
  fileTextInput: '',
  secret: '',
  file: null as File | null,
});

const rules = {
  secret: [(v: string) => !!v.trim() || 'Secret required'],
  file: [(v: File | null) => !!v || 'File required'],
};
const { errors, validateForm, clear, setError, error } = useFormValidation(
  formData,
  rules,
);

watchEffect(() => {
  if (importDataModal.value === false) {
    formData.secret = '';
    formData.fileTextInput = '';
    clear();
  }
});

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  formData.file = target.files?.[0] || null;
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
  if (!validateForm()) {
    return;
  }
  if (formData.file) {
    const fileContent = await readFileAsText(formData.file);
    try {
      importData(fileContent, formData.secret);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }
};
</script>

<template>
  <AppModal v-slot="{ updateContent }" v-model="importDataModal">
    <AppModalContent class="max-w-lg">
      <AppModalHeader>
        <AppModalTitle>Import data</AppModalTitle>
        <AppModalDescription>
          Is simply dummy text of the printing and typesetting industry
        </AppModalDescription>
        <form @submit.prevent="handleImport">
          <ErrorMessage :error-message="error" />
          <div class="space-y-2 my-4">
            <AppLabel :error-message="errors['file']">File</AppLabel>
            <AppInput
              v-model="formData.fileTextInput"
              :error-message="errors['file']"
              type="file"
              @change="handleFileChange"
            />
            <ErrorMessage :error-message="errors['file']" />
          </div>
          <div class="space-y-2 my-4">
            <AppLabel :error-message="errors['secret']">Secret key</AppLabel>
            <AppInput
              v-model="formData.secret"
              :error-message="errors['secret']"
              type="password"
            />
            <ErrorMessage :error-message="errors['secret']" />
          </div>
          <div class="flex gap-4 justify-end mt-4">
            <AppButton variant="primary" type="submit">Import</AppButton>
            <AppButton variant="outline" @click="updateContent(false)">
              Cancel
            </AppButton>
          </div>
        </form>
      </AppModalHeader>
    </AppModalContent>
  </AppModal>
</template>
