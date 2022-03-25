import {IEnv} from "../interfaces/env";
import {environment} from "../services/environment.service";

export const setupFelixCore = (env:IEnv) => {
  environment.init(env);
}
