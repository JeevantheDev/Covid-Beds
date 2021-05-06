/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { body } = req;
    const { hospitalid } = req.query;
    const updatedHospital = await prisma.hospital.update({
      where: { id: Number(hospitalid) },
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
        hospitalContactNo: body.hospitalContactNo,
        hospitalImage: body.hospitalImage,
      },
    });
    return res.status(200).json({ status: 'success', message: 'Hospital updated Successfully', updatedHospital });
  }
  if (req.method === 'DELETE') {
    const { hospitalid } = req.query;
    const deletedHospital = await prisma.hospital.delete({
      where: {
        id: Number(hospitalid),
      },
    });
    return res.status(200).json({ status: 'success', message: 'Hospital deleted Successfully', deletedHospital });
  }
}
