export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  price: { size: string; price: number }[];
  slug: string;
  tags: string[];
  title: string;
  type: string;

  // TODO: agregar createdAt y updatedAt
  createdAt: string;
  updatedAt: string;
}
