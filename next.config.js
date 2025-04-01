/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  bodyParser: {
    sizeLimit: "10mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",  // Add http support for localhost
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

export default nextConfig;
