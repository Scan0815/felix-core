import {IEnv} from "../interfaces/env";

class SetupServiceController implements IEnv{
  production: boolean = false;
  externalDebug: boolean = false;
  FILE_SERVER: string|null = null;
  FILE_SERVER_PURCHASED: string|null = null;
  SOCKET_SERVER: string|null = null;
  REST_API: string|null = null;

  public init(env: IEnv){
    Object.assign(this, env);
  }

  public set(key:string,value:string){
    Object.assign(this, {[key] : value});
  }

  get restApi(){
    return this.REST_API;
  }

  get fileServer(){
    return this.FILE_SERVER;
  }

  get fileServerPurchased(){
    return this.FILE_SERVER_PURCHASED;
  }

  get socketServer(){
    return this.SOCKET_SERVER;
  }

}

export const SetupService = new SetupServiceController();


