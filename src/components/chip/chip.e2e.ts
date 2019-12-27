import { newE2EPage } from '@stencil/core/testing';

describe('chip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-chip></my-chip>');

    const element = await page.find('my-chip');
    expect(element).toHaveClass('hydrated');
  });
});
