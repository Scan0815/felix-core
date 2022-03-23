import {newE2EPage} from '@stencil/core/testing';

describe('flx-file-stack-image', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-file-stack-image></flx-file-stack-image>');

    const element = await page.find('flx-file-stack-image');
    expect(element).toHaveClass('hydrated');
  });
});
