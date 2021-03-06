/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withTM = require('next-transpile-modules')(['sawo']); // pass the modules you would like to see transpiled

module.exports = withTM({
  future: {
    webpack5: false, // you want to keep using Webpack 4
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    APP_ID: process.env.APP_ID,
    APP_SECRET: process.env.APP_SECRET,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    SAWO_API: process.env.SAWO_API,
    SECRET: process.env.SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GEOCODER_PROVIDER: process.env.GEOCODER_PROVIDER,
    GEOCODER_API_KEY: process.env.GEOCODER_API_KEY,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    REACT_APP_COVID_TRACKER_HOST: process.env.REACT_APP_COVID_TRACKER_HOST,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
