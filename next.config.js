module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: ['pizza-party-teams.s3.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
