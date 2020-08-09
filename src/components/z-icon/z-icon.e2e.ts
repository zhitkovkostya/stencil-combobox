import { newE2EPage } from '@stencil/core/testing';

describe('z-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<z-icon></z-icon>');

    const element = await page.find('z-icon');
    expect(element).toHaveClass('hydrated');
  });
});
