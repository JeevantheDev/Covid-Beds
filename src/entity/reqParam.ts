/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IcreateHospitalInitial {
  addressHospital: string;
  nameHospital: string;
  hospitalType: string;
  hospitalEmail: string;
  hospitalContactNo: string;
}

export interface IcreateHospital {
  id?: number;
  userId?: number;
  HospitalBeds?: IcreateHospitalBeds[];
  createdAt?: string;
  updatedAt?: string;
  nameHospital: string;
  locationType: string;
  locationCoordinates: string[];
  locationAddress: string;
  locationFormattedAddress: string;
  locationCity: string;
  locationState: string;
  locationZipcode: string;
  locationCountryCode: string;
  hospitalType: string;
  hospitalEmail: string;
  hospitalContactNo: string;
  hospitalImage: string;
}

export interface IcreateHospitalBedsInitial {
  hospitalId: number;
  hospitalName: string;
  totalBeds: number;
  currentBeds: number;
}

export interface IcreateHospitalBeds {
  id?: number;
  hospitalId?: number;
  totalBeds: number;
  currentBeds: number;
}
