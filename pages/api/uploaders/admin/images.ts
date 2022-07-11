import type { NextApiRequest, NextApiResponse } from 'next';
import { imageUpload } from '../../../../libs';

type Data = {
  message: string;
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

const uploadImageUser = async (req: NextApiRequest, resp: NextApiResponse) => {
  const { base64, path, fileName, fileType, extension } = req.body;
  const basecv = Buffer.from(base64, 'base64');

  const image = await imageUpload.uploadFilesToStorage(
    basecv,
    path,
    fileName,
    fileType,
    extension
  );

  return resp.status(200).json({ message: image });
};
