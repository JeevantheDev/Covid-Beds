/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const allHospitals = await prisma.hospital.findMany({
      include: { HospitalBeds: true },
    });
    return res.status(200).json({ allHospitals });
  }
}
