import type { InjectionKey, Ref } from 'vue';

export const selectOptionKey: InjectionKey<
  (value: string | number, label: string) => void
> = Symbol();

export const selectedValueKey: InjectionKey<Ref<string | number | null>> =
  Symbol();
