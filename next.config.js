/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
      domains: ["placehold.co","authjs.dev"],
      dangerouslyAllowSVG: true
    },
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'pl',
  },
};

module.exports = nextConfig
