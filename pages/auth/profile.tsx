/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { GetServerSideProps } from 'next';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import MainLayout from '../../components/MainLayout/MainLayout';
import Grid from '@material-ui/core/Grid';
import { HospitalDetails } from '../../components/HospitalDetails/HospitalDetails';
import { AccountDetails } from '../../components/AccountDetails/AccountDetails';
import { getSession } from 'next-auth/client';
import useRequest from '../../src/actions/index';
import { Redirect } from '../../src/actions/Redirect';
import { SeoWrapper } from '../../components/shared/SeoWrapper';
import parseCookies from '../../src/actions/parse.cookies';

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

const profile = ({ session, reserveCookie }) => {
  const classes = useStyles();
  const { data, loading, mutate } = useRequest(session && { url: `/api/user/${session.user.email}` }, null);

  if (!session) {
    return <Redirect to="/" />;
  } else {
    return (
      <SeoWrapper title="Covid Beds | Profile" canonicalPath="/auth/profile">
        <MainLayout cookies={reserveCookie} isContainer>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <AccountDetails loading={loading} userDetails={data} />
              <HospitalDetails mutate={mutate} loading={loading} userDetails={data} />
            </Grid>
          </div>
        </MainLayout>
      </SeoWrapper>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession(context);
  const reserveCookie = parseCookies(req);
  if (res) {
    if (Object.keys(reserveCookie).length === 0 && reserveCookie.constructor === Object) {
      res.writeHead(301, { Location: '/' });
      res.end();
    }
  }
  return {
    props: { session, reserveCookie: reserveCookie && reserveCookie },
  };
};

export default profile;
