/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { IcreateHospital } from '../entity/reqParam';

export const createSeederData = async (seedersHospital: IcreateHospital[]) => {
  const reqBody = seedersHospital[0];
  return await axios.post('/api/hospital/addHospital', reqBody);
};
