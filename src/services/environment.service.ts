import {IEnv} from "../interfaces/env";

class SetupServiceController{

  private env: IEnv = {
    production:  false,
    externalDebug: false,
    FILE_SERVER: null,
    FILE_SERVER_PURCHASED: null,
    SOCKET_SERVER:  null,
    REST_API: null
  }

  public init(env: IEnv){
    this.env = env;
  }

  public set(key:string,value:string){
    this.env = Object.assign(this.env, {[key] : value});
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


