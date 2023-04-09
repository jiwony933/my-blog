/** @type {import('next').NextConfig} */

// safely ignore recoil warning messages in dev (triggered by HMR)

const nextConfig = {
  images: {
    domains: ['localhost', 'ghchart.rshah.org'],
  },
  reactStrictMode: false,
  pageExtensions: ['tsx'],
};

module.exports = nextConfig;
