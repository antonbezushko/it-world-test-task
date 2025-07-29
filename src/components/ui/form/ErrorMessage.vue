<template>
  <p v-if="props?.errorMessage" class="mt-2 text-red-500 text-sm">
    <slot>{{ props?.errorMessage }}</slot>
  </p>
</template>

<script setup lang="ts">
interface Props {
  errorMessage?: string;
}

const props = defineProps<Props>();
</script>
