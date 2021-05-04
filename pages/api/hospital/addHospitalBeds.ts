/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req;
    const createdHospitalBeds = await prisma.hospitalBeds.create({
      include: { hospital: true },
      data: {
        totalBeds: body.totalBeds,
        currentBeds: body.currentBeds,
        hospital: {
          connect: {
            id: body.hospitalId,
          },
        },
      },
    });
    return res
      .status(200)
      .json({ status: 'success', message: 'Hospital Beds created Successfully', createdHospitalBeds });
  }
}
