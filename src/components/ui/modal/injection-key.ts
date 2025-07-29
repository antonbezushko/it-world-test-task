import type { InjectionKey, Ref } from 'vue';

export interface ModalProvide {
  showContent: Ref<boolean>;
  updateContent: (v: boolean) => void;
}

export const modalInjectionKey: InjectionKey<ModalProvide> = Symbol();
