import {IEnv} from "../interfaces/env";

class EnvironmentServiceController implements IEnv{
  production: boolean;
  externalDebug: boolean;
  FILE_SERVER: string;
  FILE_SERVER_PURCHASED: string;
  SOCKET_SERVER: string;
  REST_API: string;

  public init(env: IEnv){
    Object.assign(this, env);
  }

  public set(key,value){
    Object.assign(this, {[key] : value});
  }

}

export const environment = new EnvironmentServiceController();
