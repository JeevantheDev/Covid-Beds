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

export interface IqueryUser {
  email: string;
  name: string;
  image: string;
}

export interface Iprovider {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
}

export type ProviderTypes = {
  github?: Iprovider;
  google?: Iprovider;
  facebook?: Iprovider;
};

export enum HOSPITAL_TYPE {
  PVT = 'PVT',
  GOVT = 'GOVT',
}

export enum HOSPITAL_DEFAULT {
  POINT = 'Point',
  IMAGE = 'https://firebasestorage.googleapis.com/v0/b/blog-spot-e4923.appspot.com/o/images%2Fdownload.jfif?alt=media&token=86d1d01e-663e-4a64-b394-aa9a542163ad',
}
