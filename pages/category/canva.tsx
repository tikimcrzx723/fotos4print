import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';
import { ProductList } from '../../components/products';

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('products?type=canva');
  return (
    <ShopLayout
      title='Studio-Sueno - Hombres'
      pageDescription='Encuentra los mejores productos de Studio-Sueno para ellos'
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h1' component='h1'>
          Store
        </Typography>
        <Typography variant='h2' sx={{ mb: 1 }} fontSize={20}>
          All Canvas
        </Typography>
      </Box>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
