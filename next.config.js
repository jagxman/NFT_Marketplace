module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['jagster.infura-ipfs.io'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    SECRET: process.env.SECRET,
    RPC_URL: process.env.RPC_URL,
  },
};

