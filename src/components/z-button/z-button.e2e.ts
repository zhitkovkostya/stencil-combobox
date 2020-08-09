import { newE2EPage } from '@stencil/core/testing';

describe('z-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<z-button></z-button>');

    const element = await page.find('z-button');
    expect(element).toHaveClass('hydrated');
  });
});
