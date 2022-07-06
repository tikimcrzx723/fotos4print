import { Box } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';

const ProfileHome: NextPage = () => {
  return (
    <ShopLayout title='My Profile' pageDescription='Modified my data'>
      <Box sx={{ textAlign: 'center' }}>Profile</Box>
      
    </ShopLayout>
  );
};

export default ProfileHome;
