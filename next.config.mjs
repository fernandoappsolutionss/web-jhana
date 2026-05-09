/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
  },
  // Permanent redirect: /programa-expansion → /despierta
  // (la página se renombró cuando el programa pasó a llamarse DESPIERTA)
  async redirects() {
    return [
      {
        source: '/programa-expansion',
        destination: '/despierta',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
