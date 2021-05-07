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
import useRequest from '../src/actions/index';

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

export default function Hospitals() {
  const classes = useStyles();
  const { data, loading } = useRequest({ url: `/api/hospital/allHospitals` }, null);
  if (!loading) {
    console.log(data);
  }
  return (
    <MainLayout>
      <div className={classes.root}>
        <h1>All Hospitals</h1>
      </div>
    </MainLayout>
  );
}
