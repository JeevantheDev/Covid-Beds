/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client';
import { Navbar } from '../shared/Navbar';
import { IauthUser } from '../../src/entity/constant';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  })
);

interface Iprops {
  children?: React.ReactElement;
  isContainer?: boolean;
  cookies?: any;
}

const MainLayout: React.FC<Iprops> = ({ children, isContainer, cookies }) => {
  const classes = useStyles();
  const [session] = useSession();

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  const [authUser, setAuthUser] = useState<IauthUser>({
    email: '',
    name: '',
    authenticated: false,
  });

  useEffect(() => {
    if (session && (session.user.email || session.user.name)) {
      setAuthUser({
        email: session.user.email,
        name: session.user.name,
        authenticated: true,
      });
    }
  }, [session]);

  return (
    <div id="root">
      <Navbar cookies={cookies} authenticated={authUser.authenticated} />
      {isContainer && (
        <Container maxWidth="lg">
          <div className={classes.root} id="react-children">
            {children}
          </div>
        </Container>
      )}
      {!isContainer && <div id="react-children">{children}</div>}
    </div>
  );
};

export default MainLayout;
