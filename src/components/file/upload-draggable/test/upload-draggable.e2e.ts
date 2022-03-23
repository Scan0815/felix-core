import {newE2EPage} from '@stencil/core/testing';

describe('flx-file-upload-draggable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-file-upload-draggable></flx-file-upload-draggable>');

    const element = await page.find('flx-file-upload-draggable');
    expect(element).toHaveClass('hydrated');
  });
});
