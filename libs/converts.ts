const coverterBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const returnBase64 = async (file: File) => {
  const base64: any = await coverterBase64(file);
  return base64.replace('data', '').replace(/^.+,/, '');
};
