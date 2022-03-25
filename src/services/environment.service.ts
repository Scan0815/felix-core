import {IEnv} from "../interfaces/env";
import {StorageService} from "./storage.service";

class SetupServiceController{

  private env: IEnv = {
    production:  false,
    externalDebug: false,
    FILE_SERVER: null,
    FILE_SERVER_PURCHASED: null,
    SOCKET_SERVER:  null,
    REST_API: null
  }

  constructor() {
    const _env = StorageService.get(PERSISTENT_KEY);
    if(_env){
      this.env = _env;
    }
  }

  public init(env: IEnv){
    this.env = env;
    StorageService.set(PERSISTENT_KEY,this.env);
  }

  get environment(): IEnv{
    return this.env;
  }

  get restApi(){
    return this.env.REST_API;
  }

  get fileServer(){
    return this.env.FILE_SERVER;
  }

  get fileServerPurchased(){
    return this.env.FILE_SERVER_PURCHASED;
  }

  get socketServer(){
    return this.env.SOCKET_SERVER;
  }

}

export const SetupService = new SetupServiceController();

const PERSISTENT_KEY = "felix_persistent_config";
