/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import Typography from '@material-ui/core/Typography';
import MicroFrontend from '../components/MicroFrontend/MicroFrontend';
import { LandingPageForm } from '../components/LandingPageForm/LandingPageForm';
import { useRouter } from 'next/router';
// import { Seeders } from '../components/shared/Seeders';
import { SeoWrapper } from '../components/shared/SeoWrapper';
const { REACT_APP_COVID_TRACKER_HOST: covidTrackerHost } = process.env;
import parseCookies from '../src/actions/parse.cookies';
import { GetServerSideProps } from 'next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    margin: {
      margin: theme.spacing(1.5),
    },
    button: {
      marginTop: theme.spacing(2),
    },
    paper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: 'center',
      backgroundColor: theme.palette.secondary.light,
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        justifyContent: 'center',
        height: '100%',
      },
    },
  })
);

function CovidTracker() {
  return <MicroFrontend host={covidTrackerHost} name="CovidTracker" />;
}

export default function Home({ reserveCookie }) {
  const classes = useStyles();
  const router = useRouter();

  const onSearchSubmit = (state: string, zipcode: string) => {
    if (state !== '' && zipcode !== '') {
      router.push(`/hospitals/${state},${zipcode}`);
    }
  };

  return (
    <SeoWrapper title="Covid Beds | Welcome">
      <MainLayout cookies={reserveCookie} isContainer>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} sm={12}>
              <Paper elevation={0} className={classes.paper}>
                <Image objectFit="contain" src="/landing.svg" alt="landing" width="1000" height="1000" />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Paper elevation={0} className={classes.paper}>
                <Box mb={2} style={{ width: '100%', height: '100%' }}>
                  <CovidTracker />
                </Box>
                <Box>
                  <Box>
                    <Typography variant="h3" color="primary" gutterBottom>
                      Find a Covid Hospital
                    </Typography>
                    <span style={{ fontWeight: 'lighter', fontSize: '20px' }}>Search by Your Location</span>
                  </Box>
                  <Box>
                    <div
                      className={classes.margin}
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                    >
                      <LandingPageForm handleClickSearch={onSearchSubmit} />
                      {/* <Seeders /> */}
                    </div>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </MainLayout>
    </SeoWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const reserveCookie = parseCookies(req);
  if (res) {
    if (Object.keys(reserveCookie).length === 0 && reserveCookie.constructor === Object) {
      res.writeHead(301, { Location: '/' });
      res.end();
    }
  }
  return {
    props: {
      reserveCookie: reserveCookie && reserveCookie,
    },
  };
};
