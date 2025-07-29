<template>
  <button
    :class="
      twMerge(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-1 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]   has-[>svg]:px-2 font-medium cursor-pointer',
        props.class,
        variantClasses,
        sizeClasses,
      )
    "
    v-bind="props"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, type ButtonHTMLAttributes, type HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
  type?: ButtonHTMLAttributes['type'];
  variant?: 'default' | 'primary' | 'outline' | 'destructive';
  size?: 'lg' | 'sm' | 'md' | 'icon';
}

const variantClasses = computed<string>(() => {
  const variant = props.variant;
  switch (variant) {
    case 'primary':
      return 'bg-black text-white shadow-xs hover:bg-black/80';

    case 'outline':
      return 'bg-white text-black shadow-xs hover:bg-white/80 border-1 border-gray-400/40 hover:bg-gray-300/40';

    case 'destructive':
      return 'bg-amber-700 text-white shadow-xs hover:bg-amber-700 border-1 border-bg-amber-700/40 hover:bg-amber-700/80';

    case 'default':
      return 'bg-black text-white shadow-xs hover:bg-black/80';

    default:
      const fallbackVariant: never = variant;
      return fallbackVariant;
  }
});

const sizeClasses = computed<string>(() => {
  const size = props.size;
  switch (size) {
    case 'lg':
      return '';

    case 'md':
      return 'h-9 px-4 py-2';

    case 'sm':
      return 'h-7 px-2 py-0.5';

    case 'icon':
      return 'h-7';

    default:
      const fallbackSize: never = size;
      return fallbackSize;
  }
});

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'default',
  size: 'md',
});
</script>
