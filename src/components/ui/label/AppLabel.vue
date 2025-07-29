<template>
  <label
    :class="
      twMerge(
        'block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class
      )
    "
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { HTMLAttributes } from 'vue';
interface Props {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();
</script>
