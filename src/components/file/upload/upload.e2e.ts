import {newE2EPage} from '@stencil/core/testing';

describe('file-upload', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<file-upload></file-upload>');

    const element = await page.find('file-upload');
    expect(element).toHaveClass('hydrated');
  });
});
