import {newE2EPage} from '@stencil/core/testing';

describe('file-stack-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<file-stack-avatar></file-stack-avatar>');

    const element = await page.find('file-stack-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
