<template>
  <div :class="['relative w-full', props.class]" ref="selectRoot">
    <button
      type="button"
      :class="[
        'flex h-9 w-full items-center rounded-md border border-gray-400/40 bg-white px-3 py-1 text-sm shadow-sm cursor-pointer outline-2 outline-transparent  focus:border-0',
        props.errorMessage
          ? 'border-red-500 focus:outline-red-400'
          : 'focus:outline-gray-400',
      ]"
      @click="toggleDropdown"
    >
      <span
        class="flex-1 text-left"
        :class="selectedLabel ? 'text-gray-900' : 'text-gray-400'"
      >
        {{ selectedLabel || placeholder }}
      </span>
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        data-slot="icon"
        aria-hidden="true"
        class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
      >
        <path
          d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        ></path>
      </svg>
    </button>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-show="isOpen"
        class="absolute z-10 p-2 mt-1 max-h-60 w-full overflow-auto rounded-md border-gray-400/40 border bg-white text-base"
        @click.stop
      >
        <slot> </slot>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import AppSelectOption from '@/components/ui/select/AppSelectOption.vue';
import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  provide,
  useSlots,
  type VNode,
  type HTMLAttributes,
} from 'vue';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue?: string | number | null;
  options?: Option[];
  placeholder?: string;
  errorMessage?: string;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  options: () => [],
});

const model = defineModel<string | number | null>({
  default: null,
});

const slots = useSlots();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
}>();

const selectRoot = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const selectedLabel = ref('');

watch(
  () => props.modelValue,
  (newValue) => {
    const defaultSlot = slots.default?.();
    if (!defaultSlot) {
      return;
    }
    defaultSlot
      .filter((node): node is VNode => {
        return node.type === AppSelectOption;
      })
      .forEach((node) => {
        if (node.props?.value == newValue) {
          selectedLabel.value = node.props?.label;
          return;
        }
      });
  },
  { immediate: true },
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const clickOutsideHandler = (event: MouseEvent) => {
  console.log(selectRoot.value);

  if (selectRoot.value && !selectRoot.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

provide('selectOption', (value: string | number, label: string) => {
  emit('update:modelValue', value);
  selectedLabel.value = label;
  isOpen.value = false;
});

provide('selectedValue', model);

onMounted(() => {
  document.addEventListener('click', clickOutsideHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideHandler);
});
</script>
