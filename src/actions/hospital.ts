/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IcreateHospital, IcreateHospitalBeds } from 'src/entity/reqParam';
import axios from 'axios';
import { useApiHandler } from '.'; //index page

const config = {
  headers: { 'content-type': 'multipart/form-data' },
  onUploadProgress: (event) => Math.round((event.loaded * 100) / event.total),
};

export const uploadImage = async (imageFile: any) => {
  return await axios.post('/api/hospital/imageUpload', imageFile, config);
};
export const createHospital = async (reqBody: IcreateHospital) => {
  return await axios.post('/api/hospital/addHospital', reqBody);
};

export const updateHospital = async (reqBody: IcreateHospital) => {
  return await axios.put(`/api/hospital/action/${reqBody.id}`, reqBody);
};
export const deleteHospital = async (id: number) => {
  return await axios.delete(`/api/hospital/action/${id}`);
};

export const createHospitalBeds = async (reqBody: IcreateHospitalBeds) => {
  return await axios.post('/api/hospital/addHospitalBeds', reqBody);
};
export const updateHospitalBed = async (reqBody: IcreateHospitalBeds) => {
  return await axios.put(`/api/hospital/updateHospitalBed/${reqBody.id}`, reqBody);
};

export const useUploadImage = () => {
  return useApiHandler(uploadImage);
};
export const useCreateHospital = () => {
  return useApiHandler(createHospital);
};
export const useUpdateHospital = () => {
  return useApiHandler(updateHospital);
};
export const useDeleteHospital = () => {
  return useApiHandler(deleteHospital);
};

export const useCreateHospitalBeds = () => {
  return useApiHandler(createHospitalBeds);
};
export const useUpdateHospitalBed = () => {
  return useApiHandler(updateHospitalBed);
};
