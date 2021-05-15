/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { UserImageVerify } from '../components/UserImageVerify/UserImageVerify';

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
      height: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: 'center',
      backgroundColor: theme.palette.secondary.light,
    },
  })
);

export default function VerifyUser() {
  const classes = useStyles();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleVerifiedUser = (isVerify) => {
    setIsVerified(isVerify);
    if (isVerify) {
      router.push('/auth/signin');
    }
  };

  return (
    <MainLayout isContainer>
      <div className={classes.root}>
        <UserImageVerify handleVerifiedUser={handleVerifiedUser} />
      </div>
    </MainLayout>
  );
}
