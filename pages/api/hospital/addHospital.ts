/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { HOSPITAL_DEFAULT } from '../../../src/entity/constant';
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req;
    const createdHospital = await prisma.hospital.create({
      include: { user: true },
      data: {
        nameHospital: body.nameHospital,
        locationType: body.locationType,
        locationCoordinates: body.locationCoordinates.toString(),
        locationFormattedAddress: body.locationFormattedAddress,
        locationCity: body.locationCity,
        locationState: body.locationState,
        locationZipcode: body.locationZipcode,
        locationCountryCode: body.locationCountryCode,
        hospitalType: body.hospitalType,
        hospiatlEmail: body.hospitalEmail,
        hospitalContactNo: body.hospitalContactNo.toString(),
        hospitalImage: HOSPITAL_DEFAULT.IMAGE,
        user: {
          connect: {
            id: body.userId,
          },
        },
      },
    });
    return res.status(200).json({ status: 'success', message: 'Hospital created Successfully', createdHospital });
  }
}
