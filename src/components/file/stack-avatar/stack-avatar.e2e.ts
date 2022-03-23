import {newE2EPage} from '@stencil/core/testing';

describe('flx-file-stack-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-file-stack-avatar></flx-file-stack-avatar>');

    const element = await page.find('flx-file-stack-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
