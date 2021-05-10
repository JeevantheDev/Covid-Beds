/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

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
      height: '90%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: 'center',
      backgroundColor: theme.palette.secondary.light,
    },
  })
);

export default function Home() {
  const classes = useStyles();

  return (
    <MainLayout isContainer>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} sm={6}>
            <Paper elevation={0} className={classes.paper}>
              <Image loading="eager" objectFit="contain" src="/landing.svg" alt="landing" width="1000" height="1000" />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <Paper elevation={0} className={classes.paper}>
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sm={6}>
                      <TextField fullWidth label="Enter your Country" id="outlined-basic" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                      <TextField fullWidth label="Enter your ZipCode" id="outlined-basic" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Button className={classes.button} variant="contained" color="secondary" startIcon={<SearchIcon />}>
                    Search
                  </Button>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
}
