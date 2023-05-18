/** @type {import('next').NextConfig} */

// safely ignore recoil warning messages in dev (triggered by HMR)
const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withTM], {
  images: {
    domains: ['localhost', 'ghchart.rshah.org', 'velog.velcdn.com'],
  },
  reactStrictMode: false,
  pageExtensions: ['tsx'],
});
