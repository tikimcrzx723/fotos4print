import type { NextPage } from 'next';

import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';

import { useProducts } from '../hooks/useProducts';
import { FullScreenLoading } from '../components/ui';
import { ProductList } from '../components/products';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('products');

  return (
    <ShopLayout
      title={'Studio-Sueno - Home'}
      pageDescription={'Encuentra las mejores fotos'}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h1' component='h1'>
          Store
        </Typography>
        <Typography variant='h2' sx={{ mb: 1 }} fontSize={20}>
          All Products
        </Typography>
      </Box>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
