import bcryptjs from 'bcryptjs';

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'client';
}

interface SeedData {
  users: SeedUser[];
}

const password00 = bcryptjs.hashSync('Co$$ett3.es@ad');
const password01 = bcryptjs.hashSync('Eutiquiano');

export const initialData: SeedData = {
  users: [
    {
      name: 'Le Portrait de Petit Cossette',
      email: 'cossette@gmail.com',
      password: password00,
      role: 'admin',
    },
    {
      name: 'Eutiquio Javier',
      email: 'tikimioo@gmail.com',
      password: password01,
      role: 'client',
    },
  ],
};
