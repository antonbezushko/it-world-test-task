<script setup lang="ts">
import TaskTag from '@/components/feature/task/TaskTag.vue';
import AppButton from '@/components/ui/button/AppButton.vue';
import AppInput from '@/components/ui/input/AppInput.vue';
import AppLabel from '@/components/ui/label/AppLabel.vue';
import AppModal from '@/components/ui/modal/AppModal.vue';
import AppModalContent from '@/components/ui/modal/AppModalContent.vue';
import AppModalDescription from '@/components/ui/modal/AppModalDescription.vue';
import AppModalHeader from '@/components/ui/modal/AppModalHeader.vue';
import AppModalTitle from '@/components/ui/modal/AppModalTitle.vue';
import AppSelect from '@/components/ui/select/AppSelect.vue';
import AppSelectOption from '@/components/ui/select/AppSelectOption.vue';
import { useTaskForm } from '@/composables/form/useTaskForm';
import { useTasksStore } from '@/stores/tasks.store';
import { storeToRefs } from 'pinia';
import { watchEffect, ref } from 'vue';

const tasksStore = useTasksStore();
const { addTask, addProject } = tasksStore;

const { addTaskModal, projects, currentProjectId } = storeToRefs(tasksStore);

const { addTagInput, addTag, formData, reset, tagInput, availableTags, formDataToSave } =
  useTaskForm();

const isCreateProject = ref(false);
const projectName = ref('');

function addProjectHandler() {
  addProject(projectName.value);
  isCreateProject.value = false;
}

watchEffect(() => {
  if (addTaskModal.value === false) {
    reset();
  }
});
</script>

<template>
  <AppModal v-model="addTaskModal" v-slot="{ updateContent }">
    <AppModalContent class="max-w-lg">
      <AppModalHeader>
        <AppModalTitle>Add new task</AppModalTitle>
        <AppModalDescription>
          Is simply dummy text of the printing and typesetting industry
        </AppModalDescription>
        <form class="my-6 h-10">
          <AppButton
            v-if="!isCreateProject"
            variant="outline"
            @click="isCreateProject = !isCreateProject"
          >
            Create project
          </AppButton>
          <div v-else class="relative space-y-2">
            <AppInput v-model="projectName" placeholder="Project name" />
            <div class="absolute right-0 top-0 flex gap-0">
              <AppButton class="rounded-r-none" @click="addProjectHandler">Add</AppButton>
              <AppButton @click="isCreateProject = false" class="rounded-l-none" variant="outline">
                Cancel
              </AppButton>
            </div>
          </div>
        </form>
        <form>
          <div class="space-y-2">
            <AppLabel for="tags">Project</AppLabel>
            <AppSelect v-model="currentProjectId" placeholder="Select project">
              <AppSelectOption
                v-for="project in projects"
                :key="project.id"
                :label="project.name"
                :value="project.id"
              />
            </AppSelect>
          </div>

          <div class="flex flex-col gap-y-4 py-4">
            <div class="space-y-2">
              <AppLabel for="name">Title</AppLabel>
              <AppInput placeholder="Title" name="name" v-model="formData.title" />
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
                <TaskTag class="cursor-pointer" @click="addTag(tag)" v-for="tag in availableTags">
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
            <AppButton variant="primary" @click="addTask(formDataToSave)">Save</AppButton>
            <AppButton variant="outline" @click="updateContent(false)">Cancel</AppButton>
          </div>
        </form>
      </AppModalHeader>
    </AppModalContent>
  </AppModal>
</template>
