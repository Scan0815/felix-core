import {IEnv} from "../interfaces/env";
import {SetupService} from "../services/setup.service";

export const setupFelixCore = (env:IEnv) => {
  SetupService.init(env);
}
