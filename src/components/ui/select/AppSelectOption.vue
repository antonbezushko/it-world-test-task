<template>
  <li
    class="relative cursor-default select-none pl-2 pr-9 text-black hover:bg-gray-200 transition-colors py-1.5 text-sm rounded-md"
    :class="{
      'bg-gray-200 ': isSelected,
      'font-semibold': isSelected,
    }"
    @click="handleClick"
  >
    <span class="block truncate">
      <slot>{{ label }}</slot>
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, watchEffect, type Ref } from 'vue';

const props = defineProps<{
  value: string | number;
  label?: string;
  selected?: boolean;
}>();

const emit = defineEmits<{
  (e: 'select', value: string | number): void;
}>();

const selectedValue = inject<Ref<string | number | null>>('selectedValue')!;
const isSelected = computed(() => props.value === selectedValue?.value);
const selectOption = inject('selectOption');

const handleClick = () => {
  selectOption(props.value, props.label);
  emit('select', props.value);
};

watchEffect(() => {
  if (selectedValue.value === props.value) {
    selectOption(props.value, props.label);
  }
});

onMounted(() => {
  if (selectedValue === props.value) {
    selectOption(props.value, props.label);
  }

  if (props.selected) {
    selectOption(props.value, props.label);
  }
});
</script>
