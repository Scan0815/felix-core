import {Deserializable} from './deserialize';

export type TDataType = 'personalData' | 'bankDetails' | 'payPal'| 'contactData';

export interface IPersonalData {
  firstName: string|undefined,
  lastName: string|undefined,
  street: string|undefined,
  number: string|undefined,
  zip: string|undefined,
  state: string|undefined,
  city: string|undefined,
  country: string|undefined
}

export interface IBankDetails {
  iban: string|undefined,
  bic: string|undefined,
  bank: string|undefined,
  owner: string|undefined,
  preferred: boolean|undefined,
}

export interface IPayPal {
  identifier: string|undefined,
  preferred: boolean|undefined
}

export interface IContactData {
  eMail: string|undefined,
  mobile: string|undefined
}


export class ContactData implements IContactData, Deserializable {
  eMail: string|undefined;
  mobile: string|undefined;

  deserialize(input: IContactData) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}

export class BankDetails implements IBankDetails, Deserializable {
  iban: string|undefined;
  bic: string|undefined;
  bank: string|undefined;
  owner: string|undefined;
  preferred: boolean|undefined;

  deserialize(input: IBankDetails) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}


export class PersonalData implements IPersonalData, Deserializable {
  firstName: string|undefined;
  lastName: string|undefined;
  street: string|undefined;
  number: string|undefined;
  zip: string|undefined;
  state: string|undefined;
  city: string|undefined;
  country: string|undefined;

  deserialize(input: IPersonalData) {
    if (input) {
      Object.assign(this, input);
    }
    return this;
  }
}
