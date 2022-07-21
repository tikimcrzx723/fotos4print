import {
  Badge,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
} from '@mui/material';
import { FC, PropsWithChildren, useState, useEffect } from 'react';

interface IProp {
  images: string[];
  spacing: number;
  sm: number;
  xs: number;
}

export const ShowListImages: FC<PropsWithChildren<IProp>> = ({
  images,
  spacing,
  sm,
  xs,
}) => {
  return (
    <Grid container spacing={spacing}>
      {images.map((img) => (
        <Grid item key={img} xs={xs} sm={sm}>
          <Card>
            <CardMedia
              component='img'
              className='fadeIn'
              image={img}
              alt={img}
            />
            <CardActions>
              <Button fullWidth color='error'>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
