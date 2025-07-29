import { mount } from '@vue/test-utils';
import { describe } from 'node:test';
import { expect, it } from 'vitest';
import AppParagraph from './AppParagraph.vue';

describe('AppParagraph', () => {
  it('Should render default slot', async () => {
    const deaultSlot = `<p>Text</p>`;

    const wraped = mount(AppParagraph, {
      slots: {
        default: deaultSlot,
      },
    });

    expect(wraped.html()).toContain(deaultSlot);
  });
});
