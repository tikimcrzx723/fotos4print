import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import Product from '../../../models/Product';

type Data = { message: string } | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;

  switch (req.method) {
    case 'GET':
      return getProductBySlug(slug, req, res);
    default:
      return res.status(400).json({ message: 'No se encontro ese metodo' });
  }
}
const getProductBySlug = async (
  slug: string | string[],
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const product = await Product.findOne({ slug: `${slug}` }).lean();
  await db.disconnect();

  if (!product) {
    return res
      .status(404)
      .json({ message: `No hay enrada con ese slug: ${slug}` });
  }

  product.images = product.images.map((image) => {
    return image.includes('http')
      ? image
      : `${process.env.HOST_NAME}products/${image}`;
  });

  return res.status(200).json(product);
};
