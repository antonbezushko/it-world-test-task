<template>
  <p :class="twMerge('text-sm mt-2 text-gray-600', props.class)"><slot /></p>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss"></style>
