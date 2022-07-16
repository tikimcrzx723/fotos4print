import { ChangeEvent } from 'react';
import { converters } from '.';
import { sendData } from '../utils';

export const fileSelected = async (
  { target }: ChangeEvent<HTMLInputElement>,
  ev: Function
) => {
  if (!target.files || target.files.length === 0) return;
  try {
    ev();
  } catch (error) {
    console.log(error);
  }
};
