import {newE2EPage} from '@stencil/core/testing';

describe('file-stack-filter', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<file-stack-filter></file-stack-filter>');

    const element = await page.find('file-stack-filter');
    expect(element).toHaveClass('hydrated');
  });
});
