/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let response: any;
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
