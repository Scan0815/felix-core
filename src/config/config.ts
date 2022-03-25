import {IEnv} from "../interfaces/env";
import {environment} from "../services/environment.service";

export const setupConfig = (env:IEnv) => {
  environment.init(env);
}
