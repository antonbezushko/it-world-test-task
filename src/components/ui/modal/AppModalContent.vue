<template>
  <div
    class="fixed inset-0 bg-black/50 flex justify-center items-center z-40"
    v-show="showContent"
    @mousedown.self="updateContent(false)"
  >
    <div
      :class="
        twMerge('border-gray-300 border p-6 rounded-lg bg-white relative z-50 w-full', props.class)
      "
    >
      <slot></slot>
      <button
        type="button"
        class="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer"
        @click.stop.capture="updateContent(false)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, type HTMLAttributes } from 'vue';
import { modalInjectionKey } from './injection-key';
import { twMerge } from 'tailwind-merge';

const injectValue = inject(modalInjectionKey)!;
const { showContent, updateContent } = injectValue;

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>
