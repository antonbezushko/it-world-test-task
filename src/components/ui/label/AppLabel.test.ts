import { mount } from '@vue/test-utils';
import { describe } from 'node:test';
import AppLabel from './AppLabel.vue';
import { expect, it } from 'vitest';

describe('AppLable', () => {
  it('Should render default slot', async () => {
    const deaultSlot = `<p>Text</p>`;

    const wraped = mount(AppLabel, {
      slots: {
        default: deaultSlot,
      },
    });

    expect(wraped.html()).toContain(deaultSlot);
  });
});
