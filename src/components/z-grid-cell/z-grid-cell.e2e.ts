import { newE2EPage } from '@stencil/core/testing';

describe('z-grid-cell', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<z-grid-cell></z-grid-cell>');

    const element = await page.find('z-grid-cell');
    expect(element).toHaveClass('hydrated');
  });
});
