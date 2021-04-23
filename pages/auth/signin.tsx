/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { loadCSS } from 'fg-loadcss';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { getProviders, signIn } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { ProviderTypes, Iprovider } from '../../src/entity/constant';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import Image from 'next/image';

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
      '@media(max-width: 568px)': {
        height: '100%',
      },
      padding: theme.spacing(3),
    },
    loginGridBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginCardImg: {
      width: '100%',
      height: theme.spacing(40),
      '@media(max-width: 568px)': {
        display: 'none',
      },
    },
    loginCardMainImg: {
      objectFit: 'cover',
    },
    loginCardText: {
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
  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);
  return (
    <MainLayout>
      <>
        <div className={classes.root}>
          <Paper className={classes.loginContainer} elevation={0}>
            <Grid container spacing={3}>
              <Grid className={classes.loginGridBox} item xs={12} md={6} sm={6}>
                <Box className={classes.loginCardImg} borderRadius="50%" borderRight={1} borderBottom={1}>
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
                    {/* <Typography variant="h4" color="secondary">
                      SIGN IN
                    </Typography> */}
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
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<Icon className={`fab fa-google`} />}
                    >
                      Sign in with
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<Icon className={`fab fa-facebook`} />}
                    >
                      Sign in with
                    </Button>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
