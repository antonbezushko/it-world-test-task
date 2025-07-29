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
import { watchEffect, ref, computed, reactive } from 'vue';

const tasksStore = useTasksStore();
const { addTask, addProject } = tasksStore;

const { addTaskModal, projects, currentProjectId } = storeToRefs(tasksStore);

const {
  addTagInput,
  addTag,
  formData,
  reset,
  tagInput,
  availableTags,
  formDataToSave,
} = useTaskForm();

const isCreateProject = ref(false);

const addProjectFormData = reactive({
  name: '',
});

const projectRules = {
  name: [(v: string) => !!v.trim() || 'Name required'],
};

const formValidateProject = useFormValidation(addProjectFormData, projectRules);

function addProjectHandler() {
  if (formValidateProject.validateForm()) {
    addProject(addProjectFormData.name);
    isCreateProject.value = false;
  }
}

const rules = {
  title: [(v: string) => !!v.trim() || 'Title required'],
  projectId: [(v: string | null) => !!v || 'Project required'],
};

const validateFormData = computed(() => ({
  title: formData.title,
  status: formData.status,
  tags: formData.tags,
  projectId: currentProjectId.value,
}));

const { errors, validateForm, clear } = useFormValidation(
  validateFormData,
  rules,
);

watchEffect(() => {
  if (addTaskModal.value === false) {
    reset();
    clear();
    formValidateProject.clear();
  }
});

function addNewTaskFormHandle() {
  if (validateForm()) {
    addTask(formDataToSave.value);
  }
}

function cancelAddProjetHandler() {
  addProjectFormData.name = '';
  isCreateProject.value = false;
  formValidateProject.clear();
}
</script>

<template>
  <AppModal v-slot="{ updateContent }" v-model="addTaskModal">
    <AppModalContent class="max-w-lg">
      <AppModalHeader>
        <AppModalTitle>Add new task</AppModalTitle>
        <AppModalDescription>
          Is simply dummy text of the printing and typesetting industry
        </AppModalDescription>
        <form class="my-6" @submit.prevent="addProjectHandler">
          <AppButton
            v-if="!isCreateProject"
            variant="outline"
            @click="isCreateProject = !isCreateProject"
          >
            Create project
          </AppButton>
          <div v-else class="space-y-2">
            <AppLabel :error-message="formValidateProject.errors['name']">
              Project name
            </AppLabel>

            <div class="relative">
              <AppInput
                v-model="addProjectFormData.name"
                :error-message="formValidateProject.errors['name']"
                placeholder="Project name"
              />

              <div class="absolute right-0 bottom-0 flex gap-0">
                <AppButton class="rounded-r-none" type="submit">
                  Add
                </AppButton>
                <AppButton
                  class="rounded-l-none"
                  variant="outline"
                  @click="cancelAddProjetHandler"
                >
                  Cancel
                </AppButton>
              </div>
            </div>
            <ErrorMessage :error-message="formValidateProject.errors['name']" />
          </div>
        </form>
        <form @submit.prevent="addNewTaskFormHandle">
          <div class="space-y-2">
            <AppLabel :error-message="errors['projectId']" for="tags"
              >Project</AppLabel
            >
            <AppSelect
              v-model="currentProjectId"
              :error-message="errors['projectId']"
              placeholder="Select project"
            >
              <AppSelectOption
                v-for="project in projects"
                :key="project.id"
                :label="project.name"
                :value="project.id"
              />
            </AppSelect>
            <ErrorMessage :error-message="errors['projectId']" />
          </div>

          <div class="flex flex-col gap-y-4 py-4">
            <div class="space-y-2">
              <AppLabel :error-message="errors['title']" for="name">
                Title
              </AppLabel>
              <AppInput
                v-model="formData.title"
                :error-message="errors['title']"
                placeholder="Title"
                name="name"
              />
              <ErrorMessage :error-message="errors['title']" />
            </div>
            <div class="space-y-2">
              <AppLabel for="tags">Tags</AppLabel>
              <div class="flex flex-nowrap gap-3">
                <div class="flex-1">
                  <AppInput v-model="tagInput" placeholder="Tag" name="tags" />
                </div>
                <AppButton @click="addTagInput"> Add </AppButton>
              </div>
            </div>

            <div v-show="formData.tags.size > 0" class="space-y-2">
              <AppLabel class="text-gray-500 text-sm">Selected tags</AppLabel>
              <div class="flex flex-nowrap gap-2">
                <TaskTag
                  v-for="tag in formData.tags"
                  :key="tag"
                  class="cursor-pointer"
                  selected
                  @click="formData.tags.delete(tag)"
                  >{{ tag }}</TaskTag
                >
              </div>
            </div>

            <div class="space-y-2">
              <AppLabel class="text-gray-500 text-sm">Available tags</AppLabel>
              <div class="flex flex-nowrap gap-2">
                <TaskTag
                  v-for="tag in availableTags"
                  :key="tag"
                  class="cursor-pointer"
                  @click="addTag(tag)"
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
