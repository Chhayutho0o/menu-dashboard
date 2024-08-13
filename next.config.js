/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    COOKIE_NAME: process.env.COOKIE_NAME,
    ENCRYPT_SECRET_KEY: process.env.ENCRYPT_SECRET_KEY,
    API_MAP_KEY: process.env.API_MAP_KEY,
    API_KEY_AUTHORIZE:process.env.API_KEY_AUTHORIZE
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
