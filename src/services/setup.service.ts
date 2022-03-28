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

  private _config:IEnv|undefined;

  constructor() {
    let win:any = (window as any);
    let Felix = win.Felix = win.Felix || {};
    this._config = Felix?.config || {};
    if (Felix?.config) {
      return;
    }
    this._config = this.defaultConfig;
    win.Felix = {
      config: this._config
    };

    console.log('win.Felix',win.Felix);
  }

  public init(config: IEnv){
    let win:any = (window as any);
    this._config = {
      ...win.Felix?.config || {},
      ...config
    };
    win.Felix = {
      config: this._config
    };
  }

  get config(): IEnv| undefined{
    return this._config;
  }

}

export const SetupService = new SetupServiceController();
