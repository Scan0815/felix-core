import {IEnv} from "../interfaces/env";
export const config = (env:IEnv) => {
  console.log('setUpFelixCore',env);
  (window as any).Felix = {config: env};
}
