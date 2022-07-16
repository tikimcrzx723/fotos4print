export const sendData = (
  base64: any,
  path: string,
  fileName: string,
  fileType: string,
  extension: string
) => {
  const sendDataFile = {
    base64,
    path,
    fileName,
    fileType,
    extension,
  };

  return sendDataFile;
};
