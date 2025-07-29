import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [vue()],
  test: {
    // Глобальное подключение describe, it, expect и т.д.
    globals: true,

    // Используем happy-dom (можно заменить на 'jsdom')
    environment: 'happy-dom',

    // Поддержка импорта .vue файлов
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    // Настройки для покрытия кода
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{vue,ts}'],
      exclude: ['**/*.stories.ts', '**/*.d.ts', 'src/main.ts', 'src/App.vue'],
    },

    // Настройка алиасов как в vite.config.ts
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // Позволяет видеть изменения в реальном времени
    watch: false,

    // Параметры для изоляции тестов
    isolate: true,

    // Включить цепочку sourcemap для отладки
    sourcemap: true,
  },
});
