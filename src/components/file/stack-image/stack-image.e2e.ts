import {newE2EPage} from '@stencil/core/testing';

describe('file-stack-image', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<file-stack-image></file-stack-image>');

    const element = await page.find('file-stack-image');
    expect(element).toHaveClass('hydrated');
  });
});
