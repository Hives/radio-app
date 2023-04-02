/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    serverIp: process.env.SERVER_IP || 'localhost',
    serverPort: 3001
  }
};

module.exports = nextConfig;
