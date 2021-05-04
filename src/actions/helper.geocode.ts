/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

const BASE_MAPBOX_GEOCODE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const ACCESS_TOKEN =
  'pk.eyJ1IjoiZGFzaGplZXZhbmp5b3RpIiwiYSI6ImNrbzZvNmJ2NjBwMjEybnF3cjdsb3Z6amwifQ.AWDoIirCmvG8h-vl_uQHJQ';

export const getAddressInfo = async (address: string | any) => {
  const res = await axios.get(`${BASE_MAPBOX_GEOCODE_URL}/${address}.json`, {
    params: { access_token: ACCESS_TOKEN, limit: 1 },
  });
  return res.data;
};

//https://api.mapbox.com/geocoding/v5/mapbox.places/M-55 Baramunda Bhubaneswar Odisha 751003.json
//?access_token=
//pk.eyJ1IjoiZGFzaGplZXZhbmp5b3RpIiwiYSI6ImNrbzZvNmJ2NjBwMjEybnF3cjdsb3Z6amwifQ.AWDoIirCmvG8h-vl_uQHJQ
//&limit=1
