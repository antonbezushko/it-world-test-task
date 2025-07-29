# Учетные записи - Тестовое задание для SaaSoft

[![Vue 3](https://img.shields.io/badge/Vue-3-41b883?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2-6e9f18?logo=vitest)](https://vitest.dev/)

## О проекте

ToDo-лист с мультитиповыми статусами, тегами и шифрованным экспортом

[Демо](https://helpful-kangaroo-385c05.netlify.app)

## Технологический стек

- **Frontend**: Vue 3 (Composition API + `<script setup>`)
- **UI**: Tailwind CSS 
- **State management**: Pinia
- **Build**: Vite
- **Deploy**: Netlify

## Установка и запуск
#### Запуск в режиме разработки: 

``
yarn или npm install
``

``
yarn dev или npm run dev
``

#### Запуск в production режиме: 

``
yarn install --production или npm install --omit=dev
``

``
yarn build или npm run build
``

#### Линтинг: 


``
yarn lint или npm run lint
``

#### Форматирование: 


``
yarn format или npm run format
``

## Структура проекта
```
📦 src/
├── 📂 assets/        # Стили и изображения
├── 📂 components/        # UI-компоненты
├── 📂 factory/           # Фабрики объектов
│   └── project.factory.ts # Фабрика проектов
│   └── taks.factory.ts # Фабрика задач
├── 📂 mapper/            # Мапперы данных
│   └── task.mapper.ts # Маппер задач
├── 📂 repository/        # Репозитории данных
│   └── task.mapper.ts # Работа с данными задач
├── 📂 stores/            # Хранилища Pinia
│   └── tasks.store.ts  # Хранилище задач
├── 📂 types/             # Типы TypeScript
│   └── tasks.type.ts   # Типы для задач
├── 📜 main.ts            # Точка входа
└── 📜 App.vue            # Корневой компонент
```

