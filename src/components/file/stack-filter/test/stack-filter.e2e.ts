import {newE2EPage} from '@stencil/core/testing';

describe('flx-file-stack-filter', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-file-stack-filter></flx-file-stack-filter>');
    const element = await page.find('flx-file-stack-filter');
    expect(element).toHaveClass('hydrated');
  });
});
