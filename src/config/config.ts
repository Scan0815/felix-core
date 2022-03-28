import {IEnv} from "../interfaces/env";
export /*@__PURE__*/ const setupFelixCore = (env:IEnv) => {
  console.log('setUpFelixCore',env);
  (window as any).Felix = {config: env};
}
