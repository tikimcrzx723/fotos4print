import { FC, PropsWithChildren } from 'react';

import { Box, Button } from '@mui/material';

interface Props {
  selectedSize?: string;
  sizes: string[];

  // Methods
  onSelectedSize: (size: string) => void;
}

export const SizeSelector: FC<PropsWithChildren<Props>> = ({
  selectedSize,
  sizes,
  onSelectedSize,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size='small'
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
