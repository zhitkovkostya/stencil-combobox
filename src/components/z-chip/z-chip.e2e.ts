import { newE2EPage } from '@stencil/core/testing';

describe('z-chip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<z-chip></z-chip>');

    const element = await page.find('z-chip');
    expect(element).toHaveClass('hydrated');
  });
});
