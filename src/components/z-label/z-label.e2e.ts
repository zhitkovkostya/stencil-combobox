import { newE2EPage } from '@stencil/core/testing';

describe('z-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<z-label></z-label>');

    const element = await page.find('z-label');
    expect(element).toHaveClass('hydrated');
  });
});
