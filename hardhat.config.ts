import "dotenv/config";

import '@typechain/hardhat';
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

import "hardhat-deploy-ethers";
import "hardhat-abi-exporter";

import { task } from "hardhat/config";
import { HardhatUserConfig } from 'hardhat/config';
import { node_url, accounts, accounts_pk } from "./utils/network";

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
    /* ropsten: {
      url: node_url("ropsten"),
      accounts: accounts_pk("ropsten"),
      gasPrice: "auto",
      gas: "auto",
    }, */
    mainnet: {
      url: node_url("mainnet"),
      accounts: accounts_pk("mainnet"),
      gasPrice: "auto",
      gas: "auto",
    },
  },
  paths: {
    sources: "contracts",
  },
  abiExporter: {
    path: "./data/abi",
    clear: true,
    flat: true,
    spacing: 2,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env["ETHERSCAN_API_KEY"]
  }
};

export default config;
