module.exports = {
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
