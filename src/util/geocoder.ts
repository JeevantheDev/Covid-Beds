/* eslint-disable @typescript-eslint/no-explicit-any */
import NodeGeocoder from 'node-geocoder';

const options: any = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

export const geocoder = NodeGeocoder(options);
