/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { me } = req.query;
  const response = await prisma.user.findOne({
    include: {
      Hospital: {
        include: { HospitalBeds: true },
      },
    },
    where: {
      email: String(me),
    },
  });
  return res.status(200).json(response);
}
