export interface IauthUser {
  email: string;
  name: string;
  authenticated: boolean;
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
