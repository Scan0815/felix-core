import {newE2EPage} from '@stencil/core/testing';

describe('file-upload-draggable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<file-upload-draggable></file-upload-draggable>');

    const element = await page.find('file-upload-draggable');
    expect(element).toHaveClass('hydrated');
  });
});
