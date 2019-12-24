import { newE2EPage } from '@stencil/core/testing';

describe('combobox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-combobox></my-combobox>');

    const element = await page.find('my-combobox');
    expect(element).toHaveClass('hydrated');
  });
});
