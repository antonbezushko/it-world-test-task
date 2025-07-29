<script setup lang="ts">
import AppButton from '@/components/ui/button/AppButton.vue';
import ErrorMessage from '@/components/ui/form/ErrorMessage.vue';
import FormErrorMessage from '@/components/ui/form/ErrorMessage.vue';
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

const { exportDataModal } = storeToRefs(tasksStore);
const { downloadExport } = tasksStore;

const formData = reactive({
  secret: '',
});

const rules = {
  secret: [
    (v: string) => !!v.trim() || 'Secret required',
    (v: string) => v.length >= 8 || 'Min 8 chars ',
  ],
};
const { errors, validateForm, clear, setError, error } = useFormValidation(
  formData,
  rules,
);

watchEffect(() => {
  if (exportDataModal.value === false) {
    formData.secret = '';
    clear();
  }
});

function exportDataFormSubmitHandler() {
  if (validateForm()) {
    try {
      downloadExport(formData.secret);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError('An error occurred during export. Try again');
      }
    }
  }
}
</script>

<template>
  <AppModal v-slot="{ updateContent }" v-model="exportDataModal">
    <AppModalContent class="max-w-lg">
      <AppModalHeader>
        <AppModalTitle>Export data</AppModalTitle>
        <AppModalDescription>
          Is simply dummy text of the printing and typesetting industry
        </AppModalDescription>
        <form @submit.prevent="exportDataFormSubmitHandler">
          <FormErrorMessage v-if="error">{{ error }}</FormErrorMessage>
          <div class="space-y-2 my-4">
            <AppLabel :error-message="errors['secret']">Secret key</AppLabel>
            <AppInput
              v-model="formData.secret"
              type="password"
              :error-message="errors['secret']"
            />
            <ErrorMessage :error-message="errors['secret']" />
          </div>
          <div class="flex gap-4 justify-end mt-4">
            <AppButton variant="primary" type="submit">Export</AppButton>
            <AppButton variant="outline" @click="updateContent(false)"
              >Cancel</AppButton
            >
          </div>
        </form>
      </AppModalHeader>
    </AppModalContent>
  </AppModal>
</template>
