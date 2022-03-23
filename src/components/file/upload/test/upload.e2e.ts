import {newE2EPage} from '@stencil/core/testing';

describe('flx-file-upload', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-file-upload></flx-file-upload>');

    const element = await page.find('flx-file-upload');
    expect(element).toHaveClass('hydrated');
  });
});
