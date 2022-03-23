import {newE2EPage} from '@stencil/core/testing';

describe('flx-auth-info-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-auth-info-item></flx-auth-info-item>');

    const element = await page.find('flx-auth-info-item');
    expect(element).toHaveClass('hydrated');
  });
});
