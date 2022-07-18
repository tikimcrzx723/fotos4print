import { FacebookOutlined, Instagram, Twitter } from '@mui/icons-material';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export const Footer = () => {
  return (
    <footer>
      <Box bgcolor='text.primary' color='white'>
        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4} textAlign='center'>
              <Box borderBottom={1} textAlign='center' marginBottom={2}>
                <Typography variant='h6'>Contact:</Typography>
              </Box>
              <Box>service@fotos4print.com</Box>
              <Box>Hours Support:</Box>
              <Box>Mon-Fri: 9:00 am - 6:00 pm</Box>
            </Grid>
            <Grid item xs={12} sm={4} textAlign='center'>
              <Box borderBottom={1} marginBottom={2} textAlign='center'>
                <Typography variant='h6'>Follow us on:</Typography>
              </Box>
              <Box>
                <a
                  href='https://www.facebook.com/omar.fotostudio'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FacebookOutlined />
                </a>
                <Link href='' target='_blank' rel='noreferrer'>
                  <Instagram color='secondary' />
                </Link>
                <a
                  href='https://www.tiktok.com/@fotostudioelsueno'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image
                    src={`/tiktok-white.png`}
                    width={24}
                    height={24}
                    alt='tiktok'
                  />
                </a>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} textAlign='center'>
              <Box textAlign='center' borderBottom={1} marginBottom={2}>
                <Typography variant='h6'>Office:</Typography>
              </Box>
              <Box>
                <Typography variant='body1'>503-990-4525</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box textAlign='center' paddingBottom={2} paddingTop={2}>
          <Typography variant='h6'>
            Fotos4Print &reg; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};
