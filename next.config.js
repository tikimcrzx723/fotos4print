/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '500mb',
    },
  },
};

module.exports = nextConfig;
