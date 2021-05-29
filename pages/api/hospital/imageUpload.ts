/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let response: any;
  // Run the middleware
  await runMiddleware(req, res, cors);
  const form = new formidable.IncomingForm();
  form.uploadDir = './public/uploads';
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    response = files;
    const path = response.hospitalImage.path;
    // console.log(response.hospitalImage.path);
    return res.status(200).json({ status: 'success', path });
  });
};
