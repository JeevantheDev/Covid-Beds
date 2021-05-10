/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useRequest from '../src/actions/index';
import { IcreateHospital } from '../src/entity/reqParam';
import { HospitalCard } from '../components/HospitalCard/HospitalCard';
import { HospitalFilter } from '../components/HospitalFilter/HospitalFilter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    hospitalListContainer: {
      margin: theme.spacing(0.5),
      width: '100%',
      // padding: theme.spacing(4),
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        height: '100%',
      },
    },
    gridContainer: {
      margin: theme.spacing(0.5),
      // padding: theme.spacing(4),
      width: '100%',
      height: theme.spacing(50),
    },
  })
);

export default function Hospitals() {
  const classes = useStyles();
  const { data, loading } = useRequest({ url: `/api/hospital/allHospitals` }, null);
  return (
    <MainLayout isContainer>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} sm={12}>
            <Paper className={classes.gridContainer} variant="outlined" square />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <Grid container spacing={4}>
              <HospitalFilter />
            </Grid>
          </Grid>
          <Grid item xs={12} md={8} sm={12}>
            <Grid container spacing={4}>
              {!loading &&
                data.allHospitals.map((hospital: IcreateHospital) => {
                  return <HospitalCard key={hospital.id} hospitalDetail={hospital} />;
                })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
}
