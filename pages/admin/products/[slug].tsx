import {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { useFieldArray, useForm } from 'react-hook-form';

import {
  AddCircleOutline,
  DeleteOutlined,
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import { AdminLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { appApi } from '../../../api';
import { Product } from '../../../models';

const validTypes = ['photo', 'press', 'gift', 'canva'];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  price: { size: string; price: number }[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: NextPage<PropsWithChildren<Props>> = ({ product }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTagValue, setNewTagValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [details, setDetails] = useState([]);
  const [counter, setCounter] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: product,
  });

  const { control } = useForm();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control, name: 'price' }
  );

  useEffect(() => {
    getValues('price').map(() => {
      append({ size: '', price: 0 });
    });
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            .toLowerCase() || '';

        setValue('slug', newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');

    if (currentTags.includes(newTag)) {
      return;
    }

    currentTags.push(newTag);
  };

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter((t) => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true });
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await appApi.post<{ message: string }>(
          `/admin/uploads`,
          formData
        );
        setValue('images', [...getValues('images'), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2) return alert('Mínimo 2 imagenes');
    setIsSaving(true);

    try {
      const { data } = await appApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form,
      });

      console.log({ data });
      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };
  return (
    <AdminLayout
      title={'Product'}
      subTitle={
        product.title ? `${product.title}: editing` : 'Create a new product'
      }
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button
            color='secondary'
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type='submit'
            disabled={isSaving}
          >
            Save
          </Button>
          {/* <Fab color='secondary' aria-label='add'>
            <SaveOutlined />
          </Fab> */}
        </Box>
        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Title'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label='Description'
              variant='filled'
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'This field is required',
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Divider sx={{ my: 1 }} />
            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                onChange={({ target }) =>
                  setValue('type', target.value as any, {
                    shouldValidate: true,
                  })
                }
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color='secondary' />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            {fields.map((field, index) => (
              <div key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      label='size'
                      variant='filled'
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register(`price.${index}.size`, {
                        required: 'This field is required',
                        minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                      })}
                      error={!!errors.price}
                      helperText={errors.title?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      label='Price'
                      type='number'
                      variant='filled'
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register(`price.${index}.price`, {
                        required: 'This field is required',
                        min: {
                          value: 0,
                          message: 'The price cannot be less than 0',
                        },
                      })}
                      error={!!errors.price}
                      helperText={errors.title?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <IconButton
                      aria-label='delete'
                      onClick={() => remove(index)}
                      color='error'
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ))}
            <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
              <>
                <Button
                  color='secondary'
                  startIcon={<AddCircleOutline />}
                  sx={{ width: '150px' }}
                  type='submit'
                  onClick={() => append({ size: '24x35in', price: 25 })}
                  disabled={isSaving}
                >
                  Add prices
                </Button>
              </>
            </Box>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Slug - URL'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'This field is required',
                validate: (val) =>
                  val.trim().includes(' ')
                    ? 'No se puede tener espacios en blanco'
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label='Tags'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              helperText='Press [spacebar] to add'
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyUp={({ code }) =>
                code === 'Space' ? onNewTag() : undefined
              }
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component='ul'
            >
              {getValues('tags').map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color='primary'
                    size='small'
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display='flex' flexDirection='column'>
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
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
                accept='.png, .jpg, .jpeg'
                style={{ display: 'none' }}
                onChange={onFilesSelected}
              />

              <Chip
                label='It is necessary to 2 images'
                color='error'
                variant='outlined'
                sx={{
                  display: getValues('images').length < 2 ? 'flex' : 'none',
                }}
              />

              <Grid container spacing={2}>
                {getValues('images').map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
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
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: IProduct | null;

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
