/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  api: {
    bodyParser: {
      sizeLimit: '500mb',
    },
  },
};

module.exports = nextConfig;
