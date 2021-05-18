/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import cookie from 'cookie';

export default function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}
