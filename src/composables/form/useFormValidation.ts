import { isRef, reactive, ref, type Ref } from 'vue';

export function useFormValidation<T extends object>(
  form: Ref<T> | T,
  rules: { [K in keyof T]?: Array<(v: T[K]) => boolean | string> },
) {
  const errors = reactive<{ [K in keyof T]?: string | '' }>({});

  const validateField = (field: keyof T) => {
    if (!rules[field]) return true;

    for (const rule of rules[field]) {
      let error;
      if (isRef(form)) {
        error = rule(form.value[field]);
      } else {
        error = rule(form[field]);
      }
      if (typeof error === 'string') {
        errors[field] = error;
        return false;
      }
    }

    errors[field] = '';
    return true;
  };

  function clear() {
    for (const k in errors) {
      errors[k] = '';
    }
  }

  const error = ref('');

  const validateForm = () => {
    error.value = '';
    let isValid = true;
    Object.keys(rules).forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid && Object.keys(errors).length > 0) {
      error.value = errors[Object.keys(errors)[0]];
    }

    return isValid;
  };

  function setError(errorMessage: string) {
    error.value = errorMessage;
  }

  return { errors, validateField, validateForm, clear, error, setError };
}
