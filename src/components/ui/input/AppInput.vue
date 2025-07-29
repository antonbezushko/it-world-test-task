<template>
  <input
    :class="
      twMerge(
        'flex h-9 w-full rounded-md border border-gray-400/40 bg-transparent px-3 py-1 text-sm shadow-sm  outline-transparent outline-2 focus-visible:outline-gray-400 focus:border-0 file:pt-0.5',
        props.class
      )
    "
    v-bind="props"
    v-model="model"
  />
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { HTMLAttributes } from 'vue';

interface Props {
  type?: string;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});
const model = defineModel({
  default: '',
});
</script>
