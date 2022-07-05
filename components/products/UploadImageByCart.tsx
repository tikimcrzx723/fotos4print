import {
  FC,
  useState,
  PropsWithChildren,
  useRef,
  ChangeEvent,
  useContext,
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FileUpload, UploadOutlined } from '@mui/icons-material';
import { appApi } from '../../api';
import { Badge, Box, Card, CardActions, CardMedia, Grid } from '@mui/material';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';

interface Props {
  open: boolean;
  product: IOrderItem | ICartProduct;
  handleClickOpen: () => void;
  handleClose: () => void;
}

export const UploadImageByCart: FC<PropsWithChildren<Props>> = ({
  open,
  product,
  handleClickOpen,
  handleClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagesUser, setImagesUser] = useState([]);
  const [saveImagesOrderUser, setSaveImagesOrderUser] = useState([]);
  const { updateCartQuantity, addPthotoToUserCart } = useContext(CartContext);

  const updateQuantiry = (quantity: number) => {};
  const userSaveImage: any = [];

  const uploadImages = () => {
    if (saveImagesOrderUser.length === 0) {
      return;
    }

    saveImagesOrderUser.forEach(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await appApi.post<{ message: string }>(
        `/orders/send-images`,
        formData
      );

      userSaveImage.push({ image: data.message, quantity: 1 });
    });

    addPthotoToUserCart(1, userSaveImage as any);
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      const images = [];
      const fileUploaded = [];
      for (const file of target.files) {
        const image = URL.createObjectURL(file);
        // console.log(file.size);
        // console.log(formData);

        // const { data } = await appApi.post<{ message: string }>(
        //   `/orders/send-images`,
        //   formData
        // );
        images.push(image);
        fileUploaded.push(file);
      }

      setImagesUser(images as any);
      setSaveImagesOrderUser(fileUploaded as any);
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = (image: string) => {
    setImagesUser(imagesUser.filter((img) => img !== image));
  };

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
    uploadImages();
  };

  return (
    <div>
      <Button color='secondary' variant='outlined' onClick={handleClickOpen}>
        Add Images
        {imagesUser.length}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {'Upload your images'}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText> */}
          <Box className='fadeIn'>
            <Button
              color='secondary'
              fullWidth
              startIcon={<UploadOutlined />}
              onClick={() => fileInputRef.current?.click()}
              sx={{ mb: 3 }}
            >
              Upload Images
            </Button>
            <input
              ref={fileInputRef}
              type='file'
              multiple
              onChange={onFilesSelected}
              accept='.png, .jpg, .jpge'
              style={{ display: 'none' }}
            />
            <Grid container spacing={3}>
              {imagesUser.map((img) => (
                <Grid item key={img} xs={12} sm={4}>
                  <Badge
                    sx={{ display: 'flex' }}
                    color='secondary'
                    badgeContent={1}
                  ></Badge>
                  <Card>
                    <CardMedia
                      component='img'
                      className='fadeIn'
                      image={img}
                      alt={img}
                    />
                    <ItemCounter
                      maxValue={15}
                      currentValue={1}
                      updatedQuantity={updateQuantiry}
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
          </Box>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button color='error' autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={() =>
              onNewCartQuantityValue(product as ICartProduct, imagesUser.length)
            }
            autoFocus
          >
            Save Images
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
