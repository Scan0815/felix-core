import {IEnv} from "../interfaces/env";

class SetupServiceController{

  private defaultConfig: IEnv = {
    production:  false,
    externalDebug: false,
    FILE_SERVER: null,
    FILE_SERVER_PURCHASED: null,
    SOCKET_SERVER:  null,
    REST_API: null
  }

  constructor() {
    const win = window as any;
    const Felix = win.Felix;
    if (Felix && Felix.config && Felix.config.constructor.name !== 'Object') {
      return;
    }
    win.Felix = win.Felix || {};
    win.Felix.config = {
      ...win.Felix.config,
      ...this.defaultConfig
    };
    console.log(win.Felix);
  }

  public init(config: IEnv){
    const win = window as any;
    return win.Felix.config = {
      ...win.Felix.config,
      ...config
    };
  }

  get config(): IEnv{
    const win = window as any;
    return win.Felix.config;
  }

}

export const SetupService = new SetupServiceController();
