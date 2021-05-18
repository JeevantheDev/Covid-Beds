/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../src/util/theme';
import '../styles/globals.css';
import { ToastProvider } from 'react-toast-notifications';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <ToastProvider autoDismiss autoDismissTimeout={6000}>
            <Component {...pageProps} />
          </ToastProvider>
        </CookiesProvider>
      </ThemeProvider>
    </Provider>
  );
}

// eslint-disable-next-line import/no-default-export
export default MyApp;
