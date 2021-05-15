/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { seedersHospital, seedersHospitalBeds } from '../../src/util/hospitalData';
import { useCreateHospital, useCreateHospitalBeds } from '../../src/actions/hospital';
import { useToasts } from 'react-toast-notifications';
export const Seeders = () => {
  const { addToast } = useToasts();
  const [createHospital]: any = useCreateHospital();
  const [createHospitalBeds]: any = useCreateHospitalBeds();

  const onCreateSeederHospital = async () => {
    await createHospital(seedersHospital[10])
      .then(({ status, message }) => {
        if (status === 'success') {
          addToast(message, {
            appearance: 'success',
            autoDismiss: true,
          });
        }
      })
      .catch(() => {
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };
  const onCreateSeederHospitalBeds = async () => {
    await createHospitalBeds(seedersHospitalBeds[0])
      .then(({ status, message }) => {
        if (status === 'success') {
          addToast(message, {
            appearance: 'success',
            autoDismiss: true,
          });
        }
      })
      .catch(() => {
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  return (
    <div>
      <button onClick={onCreateSeederHospital}>Seeding data Create Hospital</button>
      <button onClick={onCreateSeederHospitalBeds}>Seeding data Create Hospital Beds</button>
    </div>
  );
};
