import {
  Badge,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
} from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface IProp {
  images: string[];
  spacing: number;
  sm: number;
  xs: number;
  elementCounter?: JSX.Element;
  elementShowQuantity?: JSX.Element;
  onDeleteImage: (img: string) => void;
}

export const ShowListImages: FC<PropsWithChildren<IProp>> = ({
  images,
  spacing,
  sm,
  xs,
  elementCounter,
  elementShowQuantity,
  onDeleteImage,
}) => {
  return (
    <Grid container spacing={spacing}>
      {images.map((img) => (
        <Grid item key={img} xs={xs} sm={sm}>
          {elementShowQuantity}
          <Card>
            <CardMedia
              component='img'
              className='fadeIn'
              image={img}
              alt={img}
            />
            {elementCounter}
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
