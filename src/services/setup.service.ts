import {IEnv} from "../interfaces/env";

class SetupServiceController{

  private win = window as any;
  readonly Felix: any;

  constructor() {
    this.Felix = this.win.Felix;
    if (this.Felix && this.Felix.config && this.Felix.config.constructor.name !== 'Object') {
      return;
    }
    this.Felix = this.Felix || {};

  }

  public init(config: IEnv){
    this.Felix.config = {
      ...this.win.Felix.config,
      ...config
    };
  }

  get config(): IEnv{
    return this.Felix.config;
  }

}

export const SetupService = new SetupServiceController();
