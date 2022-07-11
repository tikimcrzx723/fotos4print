import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import { Footer, Navbar, SideMenu } from '../ui';
import { Grid, Typography } from '@mui/material';

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />

        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />

        {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <main
        style={{
          margin: '80px auto',
          maxWidth: '1140px',
          padding: '0px 30px',
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};
