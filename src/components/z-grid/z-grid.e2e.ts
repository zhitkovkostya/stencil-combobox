import { newE2EPage } from '@stencil/core/testing';

describe('z-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<z-grid></z-grid>');

    const element = await page.find('z-grid');
    expect(element).toHaveClass('hydrated');
  });
});
