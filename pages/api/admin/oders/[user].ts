import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { IOrder } from '../../../../interfaces';
import { Order } from '../../../../models';

type Data = { message: string } | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: 'Example' });
}

const getOrdersByUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.query;

  await db.connect();

  const ordersByUsers = await Order.find({ user })
    .sort({ createdAt: 'desc' })
    .lean();

  await db.disconnect();

  return res.status(200).json(ordersByUsers);
};
