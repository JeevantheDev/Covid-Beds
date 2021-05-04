/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { GetServerSideProps } from 'next';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import Grid from '@material-ui/core/Grid';
import { HospitalDetails } from '../../components/HospitalDetails/HospitalDetails';
import { AccountDetails } from '../../components/AccountDetails/AccountDetails';
import { getSession } from 'next-auth/client';
import useRequest from '../../src/actions/index';

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

const profile = ({ session }) => {
  const classes = useStyles();
  const { data, loading } = useRequest(session && { url: `/api/user/${session.user.email}` }, null);
  return (
    <MainLayout>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <AccountDetails loading={loading} userDetails={data} />
          <HospitalDetails loading={loading} userDetails={data} />
        </Grid>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};

export default profile;
