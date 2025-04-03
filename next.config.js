/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",  // Allows loading images from localhost
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "ultracamprunners.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "zoraithost.com",
      },
    ],
  },
};

// **Make sure you use module.exports to export the config**
module.exports = nextConfig;
