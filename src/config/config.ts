import {IEnv} from "../interfaces/env";
import {SetupService} from "../services/environment.service";

export const setupFelixCore = (env:IEnv) => {
  SetupService.init(env);
}
