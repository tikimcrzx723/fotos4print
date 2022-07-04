import { FC, PropsWithChildren } from 'react';
import { Grid } from '@mui/material';
import { IProduct } from '../../interfaces';
import { ProductCard } from '.';

interface Props {
  products: IProduct[];
}

export const ProductList: FC<PropsWithChildren<Props>> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};
