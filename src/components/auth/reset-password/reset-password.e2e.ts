import {newE2EPage} from '@stencil/core/testing';

describe('flx-auth-reset-password', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-auth-reset-password></flx-auth-reset-password>');

    const element = await page.find('flx-auth-reset-password');
    expect(element).toHaveClass('hydrated');
  });
});
