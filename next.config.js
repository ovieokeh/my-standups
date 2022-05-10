module.exports = {
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.net = false
    }
    return config
  },
  env: {
    databaseUrl: process.env.MONGODB_URI,
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/dashboard',
      permanent: true,
    },
  ],
}
