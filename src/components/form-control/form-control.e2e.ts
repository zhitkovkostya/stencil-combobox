import { newE2EPage } from '@stencil/core/testing';

describe('form-control', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-form-control></my-form-control>');

    const element = await page.find('my-form-control');
    expect(element).toHaveClass('hydrated');
  });
});
