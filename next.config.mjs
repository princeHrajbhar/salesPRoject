/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
      'images.app.goo.gl', // Add this line
    ],
  },
};

export default nextConfig;
