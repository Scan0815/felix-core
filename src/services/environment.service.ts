import {IEnv} from "../interfaces/env";

class EnvironmentServiceController implements IEnv{
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

}

export const environment = new EnvironmentServiceController();


