/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IcreateHospital, IcreateHospitalBeds } from 'src/entity/reqParam';
import axios from 'axios';
import { useApiHandler } from '.'; //index page

export const createHospital = async (reqBody: IcreateHospital) => {
  return await axios.post('/api/hospital/addHospital', reqBody);
};

export const createHospitalBeds = async (reqBody: IcreateHospitalBeds) => {
  return await axios.post('/api/hospital/addHospitalBeds', reqBody);
};

export const useCreateHospital = () => {
  return useApiHandler(createHospital);
};

export const useCreateHospitalBeds = () => {
  return useApiHandler(createHospitalBeds);
};
