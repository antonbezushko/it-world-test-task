import { useTasksStore } from '@/stores/tasks.store';
import { TaskStatus, type Task } from '@/types/task';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';

type Params = Partial<{
  title: string;
  status: Task['status'];
  tags: Task['tags'];
}>;

export function useTaskForm(params?: Params) {
  const { availableTags: globalAvailableTags } = storeToRefs(useTasksStore());

  const formData = reactive({
    title: params?.title || '',
    status: params?.status || TaskStatus.todo,
    tags: new Set(params?.tags || []),
  });

  function setData(params: Params) {
    Object.assign(formData, {
      title: params?.title || '',
      status: params?.status || 'todo',
      tags: new Set(params?.tags || []),
    });
  }

  const tagInput = ref('');

  const formDataToSave = computed(() => {
    return {
      ...formData,
      tags: Array.from(formData.tags),
    };
  });

  const availableTags = computed(() => {
    return globalAvailableTags.value.filter((t) => !formData.tags.has(t));
  });

  function reset() {
    Object.assign(formData, {
      title: '',
      status: TaskStatus.todo,
      tags: new Set([]),
    });
  }

  function addTagInput() {
    if (tagInput.value !== '') {
      formData.tags.add(tagInput.value);
      tagInput.value = '';
    }
  }

  function addTag(tag: string) {
    formData.tags.add(tag);
  }

  return {
    formData,
    reset,
    tagInput,
    addTagInput,
    addTag,
    availableTags,
    formDataToSave,
    setData,
  };
}
