/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { searchFilter } = req.query;
    if (searchFilter[0] === 'all') {
      const allHospitals = await prisma.hospital.findMany({
        include: { HospitalBeds: true },
      });
      return res.status(200).json({ allHospitals });
    } else if (searchFilter[0] === 'PVT' || searchFilter[0] === 'GOVT') {
      const allHospitals = await prisma.hospital.findMany({
        where: {
          hospitalType: String(searchFilter[0]),
        },
        include: { HospitalBeds: true },
      });
      return res.status(200).json({ allHospitals });
    } else {
      const state: string = searchFilter[0].split(',')[0];
      const zipcode: string = searchFilter[0].split(',')[1];
      const allHospitals = await prisma.hospital.findMany({
        where: {
          locationState: String(state),
          locationZipcode: String(zipcode),
        },
        include: { HospitalBeds: true },
      });
      return res.status(200).json({ allHospitals });
    }
  }
}
