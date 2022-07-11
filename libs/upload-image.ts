import { Credentials, S3 } from 'aws-sdk';
const s3Client = new S3({
  region: process.env.LINODE_OBJECT_STORAGE_REGION,
  endpoint: process.env.LINODE_OBJECT_STORAGE_ENDPOINT,
  sslEnabled: true,
  s3ForcePathStyle: false,
  credentials: new Credentials({
    accessKeyId: process.env.LINODE_OBJECT_STORAGE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.LINODE_OBJECT_STORAGE_SECRET_ACCESS_KEY!,
  }),
});

export const uploadFilesToStorage = async (
  base64: any,
  path: any,
  fileName: any,
  fileType: any,
  extension: any
) => {
  const params = {
    Bucket: process.env.LINODE_OBJECT_BUCKET!,
    Key: `${path}/${fileName}.${extension}`,
    Body: base64,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `${fileType}/${extension}`,
  };

  const { Location } = await s3Client.upload(params).promise();
  return Location;
};

export const deleteFileFromObjectStorage = async (url: string) => {
  const Key = url.split(`${process.env.LINODE_OBJECT_STORAGE_ENDPOINT}/`)[1];
  const params = {
    Bucket: process.env.LINODE_OBJECT_BUCKET!,
    Key,
  };

  // see: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
  // eslint-disable-next-line consistent-return
  return s3Client.deleteObject(params).promise();
};
