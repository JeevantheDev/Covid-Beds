/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../src/util/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

// eslint-disable-next-line import/no-default-export
export default MyApp;
