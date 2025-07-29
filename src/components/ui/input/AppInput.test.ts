import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppInput from './AppInput.vue';

describe('Input component', () => {
  it('should update model value when input changes', async () => {
    const wrapper = mount(AppInput, {
      props: {
        type: 'text',
        modelValue: 'initial',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
      },
    });

    const input = wrapper.find('input');

    expect(input.element.value).toBe('initial');

    await input.setValue('new value');

    expect(wrapper.props('modelValue')).toBe('new value');
  });

  it('should reflect model value changes from parent', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: 'first',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
      },
    });

    expect(wrapper.find('input').element.value).toBe('first');

    await wrapper.setProps({ modelValue: 'updated' });

    expect(wrapper.find('input').element.value).toBe('updated');
  });
});
