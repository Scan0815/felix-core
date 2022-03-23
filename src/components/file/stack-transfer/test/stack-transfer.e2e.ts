import {newE2EPage} from '@stencil/core/testing';

describe('flx-file-stack-transfer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-file-stack-transfer></flx-file-stack-transfer>');

    const element = await page.find('flx-file-stack-transfer');
    expect(element).toHaveClass('hydrated');
  });
});
