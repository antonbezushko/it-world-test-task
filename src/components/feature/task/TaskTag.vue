<template>
  <span
    :class="
      twMerge(
        'relative inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  shadow ',
        [
          props.selected
            ? 'text-white bg-black border-gray-300 hover:bg-black/70 pr-4'
            : 'text-black border-gray-300 hover:bg-gray-200',
        ],
        props.class,
      )
    "
  >
    <CloseIcon
      v-if="props.selected"
      class="absolute right-0.5 top-1/2 -translate-y-1/2 size-3"
    />
    <slot :selected="props.selected"></slot>
  </span>
</template>

<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { twMerge } from 'tailwind-merge';
import type { HTMLAttributes } from 'vue';

interface Props {
  selected?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>
