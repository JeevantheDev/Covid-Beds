/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PrismaClient, PrismaClientValidationError } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { geocoder } from '../../../src/util/geocoder';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { body } = req;
      const reverseGeocodeResponse = await geocoder.geocode(body.locationFormattedAddress);
      const {
        latitude,
        longitude,
        formattedAddress,
        city,
        stateCode,
        zipcode,
        countryCode,
      } = reverseGeocodeResponse[0];
      const createdHospital = await prisma.hospital.create({
        include: { user: true },
        data: {
          nameHospital: body.nameHospital,
          locationType: body.locationType,
          locationCoordinates: [latitude, longitude].toString(),
          locationFormattedAddress: formattedAddress,
          locationCity: city,
          locationState: stateCode,
          locationZipcode: zipcode,
          locationCountryCode: countryCode,
          hospitalType: body.hospitalType,
          hospitalEmail: body.hospitalEmail,
          hospitalContactNo: body.hospitalContactNo.toString(),
          hospitalImage: body.hospitalImage,
          user: {
            connect: {
              id: body.userId,
            },
          },
        },
      });
      return res.status(200).json({ status: 'success', message: 'Hospital created Successfully', createdHospital });
    } catch (err) {
      if (err instanceof PrismaClientValidationError) {
        return res.status(422).json({ status: 'failed', message: err.message });
      }
    }
  }
}
