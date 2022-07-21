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
  const [imagesList, setImagesList] = useState([]);
  useEffect(() => {
    images = imagesList;
  }, [images]);

  const onDeleteImage = (image: string) => {
    images = images.filter((img) => img !== image);
    setImagesList(images as any);
    console.log(images);
  };

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
              <Button
                fullWidth
                color='error'
                onClick={() => onDeleteImage(img)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
