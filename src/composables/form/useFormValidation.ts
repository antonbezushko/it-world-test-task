import { reactive } from 'vue';

interface ValidationRule {
  (value: any): string | boolean;
}

interface FormValidationOptions {
  [field: string]: ValidationRule[];
}

export function useFormValidation(form: Record<string, any>, rules: FormValidationOptions) {
  const errors = reactive<Record<string, string>>({});

  const validateField = (field: string) => {
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
