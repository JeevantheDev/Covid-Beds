/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { IcreateHospital } from '../../src/entity/reqParam';
import Image from 'next/image';
import { Typography } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      width: '100%',
      height: theme.spacing(22),
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        height: '100%',
      },
    },
    imageMobileScreen: {
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        width: '100% !important',
        height: '100% !important',
        objectFit: 'scale-down !important',
      },
    },
    customChip: {
      backgroundColor: '#333',
      padding: theme.spacing(0.6),
      color: '#fff',
      fontSize: '12px',
      fontWeight: 'bold',
      borderRadius: 5,
    },
    chip: {
      backgroundColor: '#28A745',
      padding: theme.spacing(0.6),
      color: '#fff',
      fontSize: '12px',
      fontWeight: 'bold',
      borderRadius: 5,
    },
    columnFlexProperty: {
      [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      },
    },
    hospitalName: {
      fontWeight: 'bold',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
);

interface Iprops {
  hospitalDetail: IcreateHospital;
}
export const HospitalCard: React.FC<Iprops> = ({ hospitalDetail }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={12} sm={6}>
      <Paper className={classes.gridContainer} variant="outlined">
        <Box className={classes.columnFlexProperty} display="flex" justifyContent="space-between" alignItems="center">
          <Box style={{ width: '80%' }} flex="0.6">
            <Image
              className={classes.imageMobileScreen}
              loading="eager"
              objectFit="cover"
              width="200"
              height="175"
              src={`/uploads/${hospitalDetail.hospitalImage.split('public/uploads/')[1]}`}
            />
          </Box>
          <Box
            ml={2}
            className={classes.columnFlexProperty}
            flex={1.5}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Box
              className={classes.columnFlexProperty}
              my={1}
              style={{ width: '97%' }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {hospitalDetail.HospitalBeds.length > 0 && (
                <Link href={`/hospital/${hospitalDetail.id}`}>
                  <a>
                    <Typography className={classes.hospitalName} variant="h5" color="primary">
                      {hospitalDetail.nameHospital}
                    </Typography>
                  </a>
                </Link>
              )}
              {hospitalDetail.HospitalBeds.length === 0 && (
                <Typography className={classes.hospitalName} variant="h5" color="primary">
                  {hospitalDetail.nameHospital}
                </Typography>
              )}
              <span className={classes.chip}>{hospitalDetail.hospitalType}</span>
            </Box>
            <span className={classes.customChip}>
              {`${hospitalDetail.locationState},${hospitalDetail.locationCountryCode}`}
            </span>
            <Box display="flex" className={classes.columnFlexProperty} style={{ width: '100%', paddingTop: '10px' }}>
              {hospitalDetail.HospitalBeds.length > 0 && (
                <Typography variant="h6">
                  Beds available{' '}
                  <Typography style={{ fontWeight: 'bold' }} color="secondary" component="span" variant="h5">
                    {hospitalDetail.HospitalBeds[0].totalBeds} / {hospitalDetail.HospitalBeds[0].currentBeds}
                  </Typography>
                </Typography>
              )}
              {hospitalDetail.HospitalBeds.length === 0 && <Typography variant="h6">Beds not available </Typography>}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};
