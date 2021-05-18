/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withPWA = require('next-pwa');

module.exports = withPWA({
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    APP_ID: process.env.APP_ID,
    APP_SECRET: process.env.APP_SECRET,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    SECRET: process.env.SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GEOCODER_PROVIDER: process.env.GEOCODER_PROVIDER,
    GEOCODER_API_KEY: process.env.GEOCODER_API_KEY,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    REACT_APP_COVID_TRACKER_HOST: process.env.REACT_APP_COVID_TRACKER_HOST,
  },
  pwa: {
    dest: 'public',
  },
});
