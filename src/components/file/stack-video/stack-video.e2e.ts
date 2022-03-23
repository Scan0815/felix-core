import {newE2EPage} from '@stencil/core/testing';

describe('file-stack-video', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<file-stack-video></file-stack-video>');

    const element = await page.find('file-stack-video');
    expect(element).toHaveClass('hydrated');
  });
});
