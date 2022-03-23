import {newE2EPage} from '@stencil/core/testing';

describe('flx-auth-sign-up', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-auth-sign-up></flx-auth-sign-up>');

    const element = await page.find('flx-auth-sign-up');
    expect(element).toHaveClass('hydrated');
  });
});
