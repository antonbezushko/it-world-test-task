import { reactive } from 'vue';

export function useFormValidation<T extends object>(
  form: T,
  rules: { [K in keyof T]?: Array<(v: T[K]) => boolean | string> }
) {
  const errors = reactive<{ [K in keyof T]?: string | '' }>({});

  const validateField = (field: keyof T) => {
    if (!rules[field]) return true;

    for (const rule of rules[field]) {
      const error = rule(form[field]);
      if (typeof error === 'string') {
        errors[field] = error;
        return false;
      }
    }

    errors[field] = '';
    return true;
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(rules).forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  return { errors, validateField, validateForm };
}
