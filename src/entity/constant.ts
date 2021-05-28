import { IcreateHospital } from './reqParam';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IauthUser {
  email: string;
  name: string;
  authenticated: boolean;
}

export interface IcurrentUser {
  id?: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  Hospital: IcreateHospital[];
  createdAt: string;
  updatedAt: string;
}

export interface Iprovider {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
}

export type ProviderTypes = {
  Auth0?: Iprovider;
  google?: Iprovider;
  facebook?: Iprovider;
};

export enum HOSPITAL_TYPE {
  PVT = 'PVT',
  GOVT = 'GOVT',
}

export enum HOSPITAL_DEFAULT {
  POINT = 'Point',
  IMAGE = 'public/uploads/defualt.jpg',
}

export enum VERIFY_USER_CONDITIONS {
  NOTE1 = 'Make sure you have valid a Photo ID as a Medical Staff.',
  NOTE2 = 'Without Proper verifying of your Photo ID you can not proceed to login an account.',
  NOTE3 = 'After verified successfully you can go for login and then create your hospital with proper details respectively.',
}
