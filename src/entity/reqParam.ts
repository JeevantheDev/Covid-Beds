/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IcreateHospital {
  id?: number;
  userId?: number;
  HospitalBeds?: IcreateHospitalBeds[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  nameHospital?: string;
  locationType?: string;
  locationCoordinates?: string | string[];
  locationAddress?: string;
  locationFormattedAddress?: string;
  locationCity?: string;
  locationState?: string;
  locationZipcode?: string;
  locationCountryCode?: string;
  hospitalType?: string;
  hospitalEmail?: string;
  hospitalContactNo?: string;
  hospitalImage?: string;
}

export interface IcreateHospitalBeds {
  id?: number;
  hospitalName?: string;
  hospitalId?: number;
  totalBeds: number;
  currentBeds: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
