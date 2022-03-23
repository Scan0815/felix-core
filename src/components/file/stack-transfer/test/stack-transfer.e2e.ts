import {newE2EPage} from '@stencil/core/testing';

describe('file-stack-transfer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<file-stack-transfer></file-stack-transfer>');

    const element = await page.find('file-stack-transfer');
    expect(element).toHaveClass('hydrated');
  });
});
