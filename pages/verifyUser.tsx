/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { UserImageVerify } from '../components/UserImageVerify/UserImageVerify';
import { useCookies } from 'react-cookie';
import { uuid } from 'uuidv4';
import { useSession } from 'next-auth/client';
import { Redirect } from '../src/actions/Redirect';
import { SeoWrapper } from '../components/shared/SeoWrapper';
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

export default function VerifyUser({ reserveCookie }) {
  const classes = useStyles();
  const router = useRouter();
  const [session, loading] = useSession();
  const [cookie, setCookie] = useCookies(['verifiedID']);
  const handleVerifiedUser = (isVerify) => {
    if (isVerify) {
      const signinID: string = uuid();
      setCookie('verifiedID', signinID, {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      router.push(`/auth/signin/${signinID}`);
    } else {
      return;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (session) {
    return <Redirect to="/" />;
  } else {
    return (
      <SeoWrapper title="Covid Beds | Verify" canonicalPath="/verifyUser">
        <MainLayout cookies={reserveCookie} isContainer>
          <div className={classes.root}>
            <UserImageVerify handleVerifiedUser={handleVerifiedUser} />
          </div>
        </MainLayout>
      </SeoWrapper>
    );
  }
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
