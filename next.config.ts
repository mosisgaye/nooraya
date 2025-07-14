import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
<<<<<<< HEAD
        pathname: '/**',
=======
        pathname: '/photos/**',
>>>>>>> c1815c2 (description)
      },
    ],
  },
};

export default nextConfig;