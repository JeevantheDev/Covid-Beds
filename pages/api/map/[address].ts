/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next';

import { geocoder } from '../../../src/util/geocoder';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  const formattedAddress: any = address;
  const response = await geocoder.geocode(formattedAddress);
  return res.status(200).json(response);
}
