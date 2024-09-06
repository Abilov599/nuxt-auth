interface ICoordinates {
  lat: number;
  lng: number;
}

interface IAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: ICoordinates;
  country: string;
}

interface ICompany {
  department: string;
  name: string;
  title: string;
  address: IAddress;
}

interface IBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface IHair {
  color: string;
  type: string;
}

interface ICrypto {
  coin: string;
  wallet: string;
  network: string;
}

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: IHair;
  ip: string;
  address: IAddress;
  macAddress: string;
  university: string;
  bank: IBank;
  company: ICompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: ICrypto;
  role: string;
}

export type { IUser };
