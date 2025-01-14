/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
    direction: 'rtl',
  },
  images: {
    domains: ['localhost', 'api.qatra.com'],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:4000/api',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared': require('path').resolve(__dirname, '../shared')
    };
    return config;
  }
};

module.exports = nextConfig;
