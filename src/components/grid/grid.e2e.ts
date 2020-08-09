import { newE2EPage } from '@stencil/core/testing';

describe('my-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-grid></my-grid>');

    const element = await page.find('my-grid');
    expect(element).toHaveClass('hydrated');
  });
});
