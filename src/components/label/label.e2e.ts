import { newE2EPage } from '@stencil/core/testing';

describe('my-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-label></my-label>');

    const element = await page.find('my-label');
    expect(element).toHaveClass('hydrated');
  });
});
