<template>
  <span style="display: contents" @click="handleClick">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { modalInjectionKey } from './injection-key';

const injectValue = inject(modalInjectionKey);

const handleClick = (e: Event) => {
  e.stopPropagation();
  injectValue?.updateContent(true);
};
</script>
