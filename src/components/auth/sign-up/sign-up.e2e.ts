import {newE2EPage} from '@stencil/core/testing';
import {SetupService} from "../../../services/setup.service";

describe('flx-auth-sign-up', () => {
  it('renders', async () => {
    SetupService.init({
      REST_API: "test",
      externalDebug: false,
      FILE_SERVER: "test",
      FILE_SERVER_PURCHASED: "test",
      production: true,
      SOCKET_SERVER: "test"
    });


    console.log(SetupService.config);

    const page = await newE2EPage();
    await page.setContent('<flx-auth-sign-up></flx-auth-sign-up>');

    const element = await page.find('flx-auth-sign-up');
    expect(element).toHaveClass('hydrated');
  });
});
