/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'vighanahartaengineers.in',
          },
        ],
        destination: 'https://www.vighanahartaengineers.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
