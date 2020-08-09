import { newE2EPage } from '@stencil/core/testing';

describe('my-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-icon></my-icon>');

    const element = await page.find('my-icon');
    expect(element).toHaveClass('hydrated');
  });
});
