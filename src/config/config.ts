import {IEnv} from "../interfaces/env";
export const setupFelixConfig = (env:IEnv) => {
  (window as any).Felix = {config: env};
}
