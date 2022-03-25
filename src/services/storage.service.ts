class StorageServiceController {
  private myStorage:Storage = window.localStorage;

  constructor() {
  }

  public set(name: string, data: Object) {
    this.myStorage.setItem(name, JSON.stringify(data));
  }

  public get(name: string) {
    const find = this.myStorage.getItem(name)
    if(find)
    {
      return JSON.parse(find);
    }
  }

  public remove(name: string) {
    this.myStorage.removeItem(name);
  }
}

export const StorageService = new StorageServiceController();
