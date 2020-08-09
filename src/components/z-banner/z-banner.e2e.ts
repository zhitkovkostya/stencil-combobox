import { newE2EPage } from '@stencil/core/testing';

describe('z-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<z-banner></z-banner>');

    const element = await page.find('z-banner');
    expect(element).toHaveClass('hydrated');
  });
});
