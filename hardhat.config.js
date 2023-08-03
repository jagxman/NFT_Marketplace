const fs = require('fs');

require('@nomiclabs/hardhat-waffle');

const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/7dff926bfb5044d1bbe9a5565b48b49c',
      accounts: [privateKey],
    },
  },
  solidity: '0.8.4',
};

