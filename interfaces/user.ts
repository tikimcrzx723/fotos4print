export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;

  // TODO: agregar createdAt y updatedAt
  createdAt?: string;
  updatedAt?: string;
}
