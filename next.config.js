const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 1000,
};

module.exports = withVanillaExtract(nextConfig);
