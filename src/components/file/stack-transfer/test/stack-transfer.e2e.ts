import {newE2EPage} from '@stencil/core/testing';
import {SetupService} from "../../../../services/setup.service";

describe('flx-file-stack-transfer', () => {
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
    await page.setContent('<flx-file-stack-transfer></flx-file-stack-transfer>');

    const element = await page.find('flx-file-stack-transfer');
    expect(element).toHaveClass('hydrated');
  });
});
