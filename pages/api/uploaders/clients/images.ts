import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { imageUpload } from '../../../../libs';
import { uuid } from 'uuidv4';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500mb', // Set desired value here
      responseLimit: false,
    },
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return uploadImageUser(req, res);

    default:
      break;
  }
}

const uploadImageUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_URL,
  });
  const { base64, fileType, extension } = req.body;
  const basecv = Buffer.from(base64, 'base64');
  const absolutePath = `orders/${session.email.split('@')[0]}-${
    session.email.split('@')[1]
  }`;
  const fileName = uuid();

  const image = await imageUpload.uploadFilesToStorage(
    basecv,
    absolutePath,
    fileName,
    fileType,
    extension
  );

  return res.status(200).json({ message: image });
};

const deleteImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  const deleted = await imageUpload.deleteFileFromObjectStorage(url);
  console.log(deleted);
  return res.status(200).json({ message: 'Image deleted successfully.' });
};
