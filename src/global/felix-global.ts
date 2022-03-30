import {IEnv} from "../interfaces/env";
export const initialize = (env:IEnv) => {
  console.log('setUpFelixCore',env);
  (window as any).Felix = {config: env};
}

export default initialize;
