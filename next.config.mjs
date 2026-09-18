/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  allowedDevOrigins: [
    '192.168.1.28:3000',
    '192.168.1.28',
    '192.168.1.26:3000',
    '192.168.1.26',
    'localhost:3000',
    'localhost',
    '0.0.0.0:3000',
    '0.0.0.0'
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
