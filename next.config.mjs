/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
      'images.app.goo.gl',
      'res.cloudinary.com', // Make sure this line exists
    ],
  },
};

export default nextConfig;
