/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { getProviders, signIn, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { ProviderTypes, Iprovider } from '../../src/entity/constant';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import Image from 'next/image';
import { Redirect } from '../../src/actions/Redirect';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '90vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    loginContainer: {
      display: 'grid',
      placeItems: 'center',
      margin: theme.spacing(1),
      width: theme.spacing(100),
      height: theme.spacing(45),
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
      padding: theme.spacing(3),
      backgroundColor: theme.palette.secondary.light,
    },
    loginGridBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginCardImg: {
      width: '100%',
      height: theme.spacing(40),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    loginCardMainImg: {
      objectFit: 'cover',
    },
    loginCardText: {
      backgroundColor: theme.palette.secondary.light,
      width: '100%',
      height: theme.spacing(46),
    },
    buttonGroups: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export default function SignIn({ providers }: { providers: ProviderTypes }) {
  const classes = useStyles();
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (session) {
    return <Redirect to="/" />;
  } else {
    return (
      <MainLayout>
        <>
          <div className={classes.root}>
            <Paper className={classes.loginContainer} elevation={0}>
              <Grid container spacing={3}>
                <Grid className={classes.loginGridBox} item xs={12} md={6} sm={6}>
                  <Box className={classes.loginCardImg} borderRadius="50%" borderRight={1}>
                    <Image
                      className={classes.loginCardMainImg}
                      src="/login.svg"
                      alt="login-svg"
                      width="1000"
                      height="1000"
                    />
                  </Box>
                </Grid>
                <Grid className={classes.loginGridBox} item xs={12} md={6} sm={6}>
                  <Paper className={classes.loginCardText} elevation={0}>
                    <div className={classes.buttonGroups}>
                      {Object.values(providers).map((provider: Iprovider) => {
                        return (
                          <Button
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon className={`fab fa-${provider.name.toLowerCase()}`} />}
                          >
                            Sign in with
                          </Button>
                        );
                      })}
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </>
      </MainLayout>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
