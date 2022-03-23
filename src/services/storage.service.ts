export class StorageServiceController {
  private myStorage = window.localStorage;

  constructor() {
  }

  public set(name: string, data: Object) {
    this.myStorage.setItem(name, JSON.stringify(data));
  }

  public get(name: string) {
    return JSON.parse(this.myStorage.getItem(name));
  }

  public remove(name: string) {
    this.myStorage.removeItem(name);
  }
}

export const StorageService = new StorageServiceController();
