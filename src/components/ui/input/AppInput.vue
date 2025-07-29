<template>
  <input
    v-bind="props"
    v-model="model"
    :class="
      twMerge(
        'flex h-9 w-full rounded-md border border-gray-400/40 bg-transparent px-3 py-1 text-sm shadow-sm  outline-transparent outline-2  focus:border-0 file:pt-0.5',
        props.class,
        [
          props.errorMessage
            ? 'border-red-500 focus-visible:outline-red-400'
            : 'focus-visible:outline-gray-400',
        ],
      )
    "
  />
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { HTMLAttributes } from 'vue';

interface Props {
  type?: string;
  class?: HTMLAttributes['class'];
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const model = defineModel({
  default: '',
});
</script>
