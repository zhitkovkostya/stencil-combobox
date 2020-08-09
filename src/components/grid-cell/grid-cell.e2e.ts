import { newE2EPage } from '@stencil/core/testing';

describe('grid-cell', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<grid-cell></grid-cell>');

    const element = await page.find('grid-cell');
    expect(element).toHaveClass('hydrated');
  });
});
