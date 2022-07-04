export const isValidEmail = (email: string): boolean => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!match;
};

export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email)
    ? undefined
    : 'The email does not appear to be valid';
};

export const isValidImage = (file: string): boolean => {
  const match = String(file)
    .toLowerCase()
    .match('^.*.(jpg|JPG|gif|GIF|doc|DOC|pdf|PDF)$');

  return !!match;
};

export const IsImage = (file: string): string | undefined => {
  return isValidImage(file)
    ? undefined
    : 'The image extension o format is no valid verify your image format';
};
