<template>
  <ul class="flex gap-2 text-xs">
    <li
      v-for="tag in tags"
      :key="tag"
      class="text-white bg-black border-gray-300 rounded-sm py-1 px-1.5"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';

interface Props {
  tags: Task['tags'];
}

const { tags } = defineProps<Props>();
</script>
