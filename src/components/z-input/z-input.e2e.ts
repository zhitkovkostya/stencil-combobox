import { newE2EPage } from '@stencil/core/testing';

describe('z-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<z-input></z-input>');

    const element = await page.find('z-input');
    expect(element).toHaveClass('hydrated');
  });
});
