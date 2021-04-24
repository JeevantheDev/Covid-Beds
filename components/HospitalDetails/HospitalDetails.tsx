/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHospitalBed: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
    },
    cardHospitalDetails: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
    },
    cardHospitalImage: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
    },
  })
);

export const HospitalDetails = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} md={3} sm={6}>
        <Paper className={classes.cardHospitalBed} elevation={1} />
      </Grid>
      <Grid item xs={12} md={6} sm={6}>
        <Paper className={classes.cardHospitalDetails} elevation={1} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <Paper className={classes.cardHospitalImage} elevation={1} />
      </Grid>
    </>
  );
};
