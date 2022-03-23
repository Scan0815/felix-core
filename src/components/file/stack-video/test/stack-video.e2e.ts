import {newE2EPage} from '@stencil/core/testing';

describe('flx-file-stack-video', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-file-stack-video></flx-file-stack-video>');

    const element = await page.find('flx-file-stack-video');
    expect(element).toHaveClass('hydrated');
  });
});
