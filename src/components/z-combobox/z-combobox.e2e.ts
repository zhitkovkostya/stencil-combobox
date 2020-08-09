import { newE2EPage } from '@stencil/core/testing';

describe('z-combobox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<z-combobox></z-combobox>');

    const element = await page.find('z-combobox');
    expect(element).toHaveClass('hydrated');
  });
});
