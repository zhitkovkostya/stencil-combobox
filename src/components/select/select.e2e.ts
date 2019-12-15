import { newE2EPage } from '@stencil/core/testing';

describe('my-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-select></my-select>');

    const element = await page.find('my-select');
    expect(element).toHaveClass('hydrated');
  });
});
