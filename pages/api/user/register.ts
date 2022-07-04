import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database/';
import { User } from '../../../models';
import bcryptjs from 'bcryptjs';
import { jwt, validations } from '../../../utils';

type Data =
  | { message: string }
  | { token: string; user: { email: string; role: string; name: string } };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);
    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    res.status(400).json({ message: 'La contraseña debe ser de 6 caracteres' });
  }

  if (name.length < 2) {
    return res
      .status(400)
      .json({ message: 'El nombre debe de ser de 2 caracteres o mas' });
  }

  await db.connect();
  const user = await User.findOne({ email }).lean();

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: 'No puede usar ese correo.' });
  }

  if (!validations.isValidEmail(email)) {
    return res
      .status(400)
      .json({ message: 'El correo no tiene el formato adecuado' });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcryptjs.hashSync(password),
    role: 'client',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Revisar logs del servidor' });
  }

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  });
};
