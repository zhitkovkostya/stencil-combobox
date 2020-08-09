import { newE2EPage } from '@stencil/core/testing';

describe('my-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-banner></my-banner>');

    const element = await page.find('my-banner');
    expect(element).toHaveClass('hydrated');
  });
});
