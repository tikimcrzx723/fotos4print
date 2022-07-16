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
import { UploadOutlined } from '@mui/icons-material';
import { appApi } from '../../api';
import { Box } from '@mui/material';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { converters } from '../../libs';
import { ShowListImages } from './ShowListImages';

interface Props {
  open: boolean;
  index: number;
  product: IOrderItem | ICartProduct;
  handleClickOpen: () => void;
  handleClose: () => void;
}

export const UploadImageByCart: FC<PropsWithChildren<Props>> = ({
  open,
  product,
  handleClickOpen,
  index,
  handleClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [viewImage, setViewImage] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [imagesServer, setImagesServer] = useState([]);
  const [sendFileS3, setSendFileS3] = useState(false);
  const { updateCartQuantity } = useContext(CartContext);

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      const images64 = [];
      const viewImages = [];
      for (const file of target.files) {
        const image = URL.createObjectURL(file);
        const base64: any = await converters.returnBase64(file);
        const fileType = file.type.split('/')[0];
        const extension = file.type.split('/')[1];

        const uploadImage = { base64, fileType, extension };

        images64.push(uploadImage);
        viewImages.push(image);
      }
      product.tempImages = viewImages;
      setBase64Images(images64 as any);
      setViewImage(viewImages as any);
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = (image: string) => {
    setViewImage(viewImage.filter((img) => img !== image));
    if (product.quantity > 0) {
      product.quantity = product.quantity - 1;
      updateCartQuantity(product as ICartProduct);
    }
  };

  const returnImagesServer = async () => {
    const imagesAux = [];

    for (const image64 of base64Images) {
      const { data } = await appApi.post<{ message: string }>(
        '/uploaders/clients/images',
        image64
      );
      const imageUser = { image: data.message, quantity: 1 };
      imagesAux.push(imageUser);
    }

    return imagesAux;
  };

  const onNewCartQuantityValue = async (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    setSendFileS3(true);
    product.quantity = newQuantityValue;
    const imagesUser = await returnImagesServer();
    setImagesServer(imagesUser as any);
    console.log(imagesServer);

    product.userImages = imagesUser;

    updateCartQuantity(product);
    handleClose();
  };

  return (
    <div>
      <Box marginBottom={2} marginTop={2}>
        <Button color='primary' onClick={handleClickOpen}>
          Add your Images
        </Button>
      </Box>
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
              accept='.png, .jpg, .jpge, .JPGE'
              style={{ display: 'none' }}
            />
            <ShowListImages
              images={product.tempImages as any}
              spacing={3}
              xs={12}
              sm={4}
              onDeleteImage={onDeleteImage}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color='error' autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={() =>
              onNewCartQuantityValue(product as ICartProduct, viewImage.length)
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
