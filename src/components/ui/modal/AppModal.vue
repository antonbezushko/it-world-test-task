<template>
  <slot :update-content="updateContent" />
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { modalInjectionKey } from './injection-key';

const model = defineModel<boolean>();

const showContent = ref(model.value ?? false);

watch(model, (newValue) => {
  showContent.value = newValue || false;
});

const updateContent = (value: boolean) => {
  model.value = value;
};

provide(modalInjectionKey, {
  showContent: showContent,
  updateContent,
});
</script>
