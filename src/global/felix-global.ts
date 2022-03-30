import {IEnv} from "../interfaces/env";
export const setupFelixCore = (env:IEnv) => {
  console.log('setUpFelixCore',env);
  (window as any).Felix = {config: env};
}

export default setupFelixCore;
