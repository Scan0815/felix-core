import {newE2EPage} from '@stencil/core/testing';

describe('auth-reset-password', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<auth-reset-password></auth-reset-password>');

    const element = await page.find('auth-reset-password');
    expect(element).toHaveClass('hydrated');
  });
});
