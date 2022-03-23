import {newE2EPage} from '@stencil/core/testing';

describe('flx-auth-login', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<flx-auth-login></flx-auth-login>');
    const element = await page.find('flx-auth-login');
    expect(element).toHaveClass('hydrated');
  });
});
