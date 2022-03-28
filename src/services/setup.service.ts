import {IEnv} from "../interfaces/env";

let configStorage:IEnv|undefined;

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
    if (configStorage) {
      return;
    }
    this._config = configStorage || this.defaultConfig;
  }

  public init(config: IEnv){
    this._config = {
      ...this._config,
      ...config
    };
    return configStorage = this._config;
  }

  get config(): IEnv| undefined{
    return this._config;
  }

}

export const SetupService = new SetupServiceController();
