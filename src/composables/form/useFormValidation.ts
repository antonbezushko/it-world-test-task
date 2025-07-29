import { isRef, reactive, ref, type Reactive, type Ref } from 'vue';

export function useFormValidation<T>(
  form: Ref<T> | Reactive<T>,
  rules: {
    [K in keyof T]?: Array<(v: T[K]) => boolean | string>;
  },
) {
  const errors = reactive<Partial<Record<keyof T, string>>>({}) as Partial<
    Record<keyof T, string>
  >;

  const validateField = (field: keyof T) => {
    if (!rules[field]) return true;

    for (const rule of rules[field]) {
      let error;

      if (isRef<T>(form)) {
        error = rule(form.value[field]);
      } else {
        error = rule((form as unknown as T)[field]);
      }

      if (typeof error === 'string' && field in errors) {
        errors[field] = error;
        return false;
      }
    }

    errors[field] = '';
    return true;
  };

  function clear() {
    for (const k in errors) {
      errors[k as keyof T] = '';
    }
  }

  const error = ref('');

  const validateForm = () => {
    error.value = '';
    let isValid = true;
    Object.keys(rules).forEach((field) => {
      if (!validateField(field as keyof T)) {
        isValid = false;
      }
    });

    if (!isValid && Object.keys(errors).length > 0) {
      error.value = errors[Object.keys(errors)[0] as keyof T] || '';
    }

    return isValid;
  };

  function setError(errorMessage: string) {
    error.value = errorMessage;
  }

  return { errors, validateField, validateForm, clear, error, setError };
}
