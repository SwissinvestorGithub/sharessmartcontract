import "dotenv/config";

import '@typechain/hardhat';
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";

import { task } from "hardhat/config";
import { HardhatUserConfig } from 'hardhat/config';
import { node_url, accounts } from "./utils/network";

task("blockNumber", "Prints the current block number", async (args, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log("Current block number: " + blockNumber);
});

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
      accounts: accounts(),
      gasPrice: "auto",
      gas: "auto",
    },
    ropsten: {
      url: node_url("ropsten"),
      accounts: accounts("ropsten"),
      gasPrice: "auto",
      gas: "auto",
    },
  },
  paths: {
    sources: 'contracts',
  }
};

export default config;
