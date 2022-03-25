import {IEnv} from "../interfaces/env";

export const environment: IEnv = {
  production:  false,
  externalDebug:  false,
  FILE_SERVER: null,
  FILE_SERVER_PURCHASED: null,
  SOCKET_SERVER: null,
  REST_API: null
};

class SetupServiceController {

  public init(env: IEnv){
    Object.assign(environment, env);
  }

  public set(key:string,value:string){
    Object.assign(environment, {[key] : value});
  }

  get restApi(){
    return environment.REST_API;
  }

}

export const SetupService = new SetupServiceController();


