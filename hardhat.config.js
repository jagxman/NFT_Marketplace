const fs = require('fs');

require('@nomiclabs/hardhat-waffle');

const privateKey = fs.readFileSync('.secret').toString().trim();
const rpcURL = process.env.RPC_URL;

module.exports = {
  networks: {
    sepolia: {
      url: rpcURL,
      accounts: [privateKey],
    },
  },
  solidity: '0.8.4',
};

