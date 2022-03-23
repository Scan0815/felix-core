import {newE2EPage} from '@stencil/core/testing';

describe('auth-sign-up', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<auth-sign-up></auth-sign-up>');

    const element = await page.find('auth-sign-up');
    expect(element).toHaveClass('hydrated');
  });
});
