import {newE2EPage} from '@stencil/core/testing';

describe('modal-cropper', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modal-cropper></modal-cropper>');

    const element = await page.find('modal-cropper');
    expect(element).toEqualHtml('<modal-cropper></modal-cropper>');
  });
});
