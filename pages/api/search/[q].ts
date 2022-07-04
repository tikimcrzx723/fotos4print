import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../interfaces/product';
import { db } from '../../../database';
import { Product } from '../../../models';

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { q = '' } = req.query;
  const search = q.toString().toLowerCase();

  switch (req.method) {
    case 'GET':
      return searchProducts(search, req, res);
  }
}

const searchProducts = async (
  q: string,
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (q.length === 0) {
    return res
      .status(400)
      .json({ message: 'Debe de especificar el query de búsqueda' });
  }

  await db.connect();
  const products = await Product.find({
    $text: { $search: q },
  }).select('title images price inStock slug -_id').lean();

  return res.status(200).json(products);
};
