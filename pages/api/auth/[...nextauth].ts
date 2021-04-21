import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
};

// we will define `options` up next
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
// eslint-disable-next-line import/no-default-export
export default authHandler;
