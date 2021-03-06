import {RestService} from './rest.service';
import {lastValueFrom, Observable} from 'rxjs';
import {IUser} from '../interfaces/user';
import {ITransfer} from "../interfaces/transfer";

class TransferServiceController extends RestService {

  constructor() {
    super();
  }

  public async createTransfer(transfer: ITransfer[]) {
    const observer = this.create({
      object_count: transfer.length
    });
    const serverTransfer = await lastValueFrom(observer);
    transfer.forEach(item => {
      item.transferId = serverTransfer._id;
    })
    return transfer;
  }


  public create(data?:any): Observable<IUser> {
    return super.create(`/transfer`, data);
  }

}

export const TransferService = new TransferServiceController();
