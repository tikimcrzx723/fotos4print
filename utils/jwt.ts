import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  const seed = process.env.JWT_SECRET_SEED;
  if (!seed) {
    throw new Error('No hay semilla de JWT - Revisar variables de entorno');
  }

  return jwt.sign({ _id, email }, seed, { expiresIn: '30d' });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla JWT - Revisar variables de entorno');
  }

  if (token.length <= 10) {
    return Promise.reject('JWT no es válido');
  }

  const seedKey = process.env.JWT_SECRET_SEED || '';
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, seedKey, (err, payload) => {
        if (err) return reject('JWT no es válido');

        const { _id } = payload as { _id: string };
        resolve(_id);
      });
    } catch (error) {
      reject('JWT no es válido');
    }
  });
};
