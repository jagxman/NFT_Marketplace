

Cryptohat is a web3 marketplace application where users can list and browse NFTs on the Sepolia Network.


![image](https://github.com/jagxman/NFT_Marketplace/assets/33289432/7eca8686-c0ad-4d47-b5b0-ac2fbb4f7f2f)



## Features

- Sign in using Metamask
- Browse NFTs on the marketplace
- Search NFTs on the marketplace you're interested in.
- Interactions are done on the Smart Contract.
- View NFT metadata such as the NFT image, name, and detail.
- List your own NFTs on the marketplace.
- See your own NFTs on the marketplace you have minted.
- Dark/Light Mode Functionality

## Tech

Cryptohat uses many modern technologies listed below.

- Next JS
- Solidity
- Tailwind CSS
- Hardhat
- Ethers
- IPFS


## Installation

Install the dependencies, run your local node, and run the application.

```sh
npm install
npx hardhat run scripts/deploy.js --network localhost
npx hardhat node
npm run dev
```

## ENV Variables

To run this application locally, you must start your local node and then start the app.

| ENV | VALUE |
| ------ | ------ |
| PROJECT_ID | Infura API Key |
| SECRET | Infura API Secret |
| BASE_URL | DEDICATED GATEWAY SUBDOMAIN |
| RPC_URL | RPC Gateway |



## License
MIT

