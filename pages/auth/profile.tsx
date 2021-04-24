/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import Grid from '@material-ui/core/Grid';
import { HospitalDetails } from '../../components/HospitalDetails/HospitalDetails';
import { AccountDetails } from '../../components/AccountDetails/AccountDetails';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100vh',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  })
);

const profile = () => {
  const classes = useStyles();
  return (
    <MainLayout>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <AccountDetails />
          <HospitalDetails />
        </Grid>
      </div>
    </MainLayout>
  );
};

export default profile;
