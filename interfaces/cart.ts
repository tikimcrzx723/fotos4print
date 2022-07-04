export interface ICartProduct {
  _id?: string | undefined;
  image: string;
  type: string;
  price: number;
  size?: string;
  slug: string;
  title: string;
  quantity: number;
  userImages?: IUserImage[];
}

export interface IUserImage {
  image: string;
  quantity: number;
}
