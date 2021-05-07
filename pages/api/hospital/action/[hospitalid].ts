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
        nameHospital: body.nameHospital && body.nameHospital,
        locationType: body.locationType && body.locationType,
        locationCoordinates: body.locationCoordinates && body.locationCoordinates.toString(),
        locationFormattedAddress: body.locationFormattedAddress && body.locationFormattedAddress,
        locationCity: body.locationCity && body.locationCity,
        locationState: body.locationState && body.locationState,
        locationZipcode: body.locationZipcode && body.locationZipcode,
        locationCountryCode: body.locationCountryCode && body.locationCountryCode,
        hospitalType: body.hospitalType && body.hospitalType,
        hospiatlEmail: body.hospitalEmail && body.hospitalEmail,
        hospitalContactNo: body.hospitalContactNo && body.hospitalContactNo.toString(),
        hospitalImage: body.hospitalImage && body.hospitalImage,
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
