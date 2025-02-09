/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me'],
  },
  // Add this to ensure client-side navigation works properly
  async redirects() {
    return [];
  },
}

module.exports = nextConfig