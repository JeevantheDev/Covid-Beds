/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { Navbar } from '../shared/Navbar';
import { IauthUser } from '../../src/entity/constant';
import { Container } from '@material-ui/core';

interface Iprops {
  children?: React.ReactElement;
}

export const MainLayout: React.FC<Iprops> = ({ children }) => {
  const [session, loading] = useSession();

  const [authUser, setAuthUser] = useState<IauthUser>({
    email: '',
    name: '',
    authenticated: false,
  });

  useEffect(() => {
    if (!loading && session && session.user.email && session.user.name) {
      setAuthUser({
        email: session.user.email,
        name: session.user.name,
        authenticated: true,
      });
    }
  }, [loading, session]);

  return (
    <div id="root">
      <Navbar authenticated={authUser.authenticated} />
      <Container fixed>
        <div id="react-children">{children}</div>
      </Container>
    </div>
  );
};
