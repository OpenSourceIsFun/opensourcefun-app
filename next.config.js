const withImages = require('next-images');

module.exports = withImages({
  publicRuntimeConfig: {
    environment: process.env.ENVIRONMENT,
    serviceUrl: process.env.SERVICE_URL,
    mailchimpId: process.env.MAILCHIMP_ID,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    facebookPixel: process.env.FACEBOOK_PIXEL,
    gleamRewardUrl: process.env.GLEAM_REWARD_URL,
    rootSeed: process.env.ROOT_SEED,
    plpdContractPublicKey: process.env.PLPD_CONTRACT_PUBLIC_KEY,
    s3bucketUrlPrefix: process.env.S3_BUCKET_URL_PREFIX,
    stakingContractPublicKey: process.env.STAKING_CONTRACT_PUBLIC_KEY,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/networks',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.wasm$/i,
      type: 'javascript/auto',
      use: [{ loader: 'arraybuffer-loader' }],
    });
    return config;
  },
});
