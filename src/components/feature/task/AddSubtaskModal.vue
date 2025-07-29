<script setup lang="ts">
import TaskTag from '@/components/feature/task/TaskTag.vue';
import AppButton from '@/components/ui/button/AppButton.vue';
import ErrorMessage from '@/components/ui/form/ErrorMessage.vue';
import AppInput from '@/components/ui/input/AppInput.vue';
import AppLabel from '@/components/ui/label/AppLabel.vue';
import AppModal from '@/components/ui/modal/AppModal.vue';
import AppModalContent from '@/components/ui/modal/AppModalContent.vue';
import AppModalDescription from '@/components/ui/modal/AppModalDescription.vue';
import AppModalHeader from '@/components/ui/modal/AppModalHeader.vue';
import AppModalTitle from '@/components/ui/modal/AppModalTitle.vue';
import AppSelect from '@/components/ui/select/AppSelect.vue';
import AppSelectOption from '@/components/ui/select/AppSelectOption.vue';
import { useFormValidation } from '@/composables/form/useFormValidation';
import { useTaskForm } from '@/composables/form/useTaskForm';
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';

const tasksStore = useTasksStore();
const { addSubTask } = tasksStore;

const { subTaskModal } = storeToRefs(tasksStore);

const {
  addTagInput,
  addTag,
  formData,
  reset,
  tagInput,
  availableTags,
  formDataToSave,
} = useTaskForm();

const rules = {
  title: [(v: string) => !!v.trim() || 'Title required'],
};

const { errors, validateForm, clear } = useFormValidation(formData, rules);

watchEffect(() => {
  if (subTaskModal.value === false) {
    reset();
    clear();
  }
});

function addSubtaskFormSubmitHadler() {
  if (validateForm()) {
    addSubTask(formDataToSave.value);
  }
}
</script>

<template>
  <AppModal v-model="subTaskModal" v-slot="{ updateContent }">
    <AppModalContent class="max-w-lg">
      <AppModalHeader>
        <AppModalTitle>Add new subtask</AppModalTitle>
        <AppModalDescription>
          Is simply dummy text of the printing and typesetting industry
        </AppModalDescription>
        <form @submit.prevent="addSubtaskFormSubmitHadler">
          <div class="flex flex-col gap-y-4 py-4">
            <div class="space-y-2">
              <AppLabel for="name" :error-message="errors['title']"
                >Title</AppLabel
              >
              <AppInput
                :error-message="errors['title']"
                placeholder="Title"
                name="name"
                v-model="formData.title"
              />
              <ErrorMessage :error-message="errors['title']" />
            </div>
            <div class="space-y-2">
              <AppLabel for="tags">Tags</AppLabel>
              <div class="flex flex-nowrap gap-3">
                <AppInput v-model="tagInput" placeholder="Tag" name="tags" />
                <AppButton @click="addTagInput"> Add </AppButton>
              </div>
            </div>

            <div class="space-y-2" v-show="formData.tags.size > 0">
              <AppLabel class="text-gray-500 text-sm">Selected tags</AppLabel>
              <div class="flex flex-nowrap gap-2">
                <TaskTag
                  class="cursor-pointer"
                  selected
                  v-for="tag in formData.tags"
                  @click="formData.tags.delete(tag)"
                  >{{ tag }}</TaskTag
                >
              </div>
            </div>

            <div class="space-y-2">
              <AppLabel class="text-gray-500 text-sm">Available tags</AppLabel>
              <div class="flex flex-nowrap gap-2">
                <TaskTag
                  class="cursor-pointer"
                  @click="addTag(tag)"
                  v-for="tag in availableTags"
                >
                  {{ tag }}
                </TaskTag>
              </div>
            </div>

            <div class="space-y-2">
              <AppLabel>Status</AppLabel>

              <div class="flex flex-row gap-2">
                <AppSelect v-model="formData.status">
                  <AppSelectOption label="Todo" value="todo" />
                  <AppSelectOption label="Done" value="done" />
                  <AppSelectOption label="In-Progress" value="in-progress" />
                </AppSelect>
              </div>
            </div>
          </div>
          <div class="flex gap-4 justify-end mt-4">
            <AppButton variant="primary" type="submit">Save</AppButton>
            <AppButton variant="outline" @click="updateContent(false)"
              >Cancel</AppButton
            >
          </div>
        </form>
      </AppModalHeader>
    </AppModalContent>
  </AppModal>
</template>
