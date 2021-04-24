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
    root: {
      width: '100%',
      height: '100vh',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    cardAvatar: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
    },
    cardDetails: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
    },
  })
);

export const AccountDetails = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} md={3} sm={6}>
        <Paper className={classes.cardAvatar} elevation={1} />
      </Grid>
      <Grid item xs={12} md={9} sm={6}>
        <Paper className={classes.cardDetails} elevation={1} />
      </Grid>
    </>
  );
};
