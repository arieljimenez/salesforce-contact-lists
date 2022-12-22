/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REDIRECT_URL: process.env.REDIRECT_URL,
  }
}

module.exports = nextConfig
