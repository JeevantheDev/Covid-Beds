/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Box } from '@material-ui/core';
import { HospitalSearchFilter } from '../HospitalSearchFilter/HospitalSearchFilter';
import { HospitalFilterInput } from '../HospitalFilterInput/HospitalFilterInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ByLocationFilterPaper: {
      width: '100%',
      height: '100%',
      padding: theme.spacing(2),
    },
    filterPaper: {
      width: '100%',
      height: '100%',
    },
  })
);

export const HospitalFilter: React.FC = () => {
  const classes = useStyles();

  const onSearchSubmit = (state: string, zipcode: string) => {
    console.log(zipcode);
    console.log(state);
  };
  const onFilterSubmit = (hospitalType: string) => {
    console.log(hospitalType);
  };

  return (
    <>
      <Grid item xs={12} md={12} sm={6}>
        <Paper className={classes.ByLocationFilterPaper} variant="outlined" square>
          <Typography style={{ marginBottom: 15 }} variant="h5" gutterBottom>
            By Location
          </Typography>
          <HospitalSearchFilter onSearchSubmit={onSearchSubmit} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} sm={6}>
        <Box className={classes.filterPaper}>
          <Typography variant="h5">Filter</Typography>
          <Typography style={{ marginBottom: 10, marginTop: 5 }} variant="subtitle1" gutterBottom>
            Hospital Type
          </Typography>
          <HospitalFilterInput onFilterSubmit={onFilterSubmit} />
        </Box>
      </Grid>
    </>
  );
};
