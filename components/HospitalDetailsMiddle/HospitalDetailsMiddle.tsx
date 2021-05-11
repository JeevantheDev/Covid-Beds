/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Image from 'next/image';
import { IcreateHospitalBeds } from '../../src/entity/reqParam';

type Props = {
  hospitalBeds: IcreateHospitalBeds;
};

export const HospitalDetailsMiddle = ({ hospitalBeds }: Props) => {
  return (
    <>
      <Box my={5} display="flex" justifyContent="center" alignItems="center">
        <Image loading="eager" width="200" height="200" src="/hospital-bed.png" />
        <Box mx={5} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
          <Typography
            style={{ letterSpacing: '15px', textTransform: 'uppercase', fontWeight: 'lighter' }}
            variant="h4"
            component="span"
            color="textPrimary"
          >
            Beds available:
          </Typography>
          <Divider style={{ width: '70%' }} />
          <Typography variant="h1" component="h2" color="secondary">
            {hospitalBeds.totalBeds} / {hospitalBeds.currentBeds}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
