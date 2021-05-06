/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { body } = req;
    const { bedid } = req.query;
    const updatedHospitalBeds = await prisma.hospitalBeds.update({
      where: { id: Number(bedid) },
      data: {
        totalBeds: body.totalBeds,
        currentBeds: body.currentBeds,
      },
    });
    return res
      .status(200)
      .json({ status: 'success', message: 'Hospital Beds updated Successfully', updatedHospitalBeds });
  }
}
