# sharessmartcontract
Swissinvestor Shares Smart Contract

## Prerequisites

### `npm install`

Installs all the dependencies to run the project.

### `Add .env file.`

Rename the `.env-example` file to `.env` and add all the required API Keys and Private Keys.

## Available Scripts

In the project directory, you can run:

### `npm run compile`

Compiles all the contracts.

### `npm run test`

Runs the test suite.

### `npm run run:local`

Starts the local hardhat blockchain node where you can deploy the contracts locally and test it.

### `npm run deploy:local`

Deploys the contract on local network. 

### `npm run deploy:ropsten`

Deploys the contract on ropsten network.

### `npm run verify:ropsten`

Verifies the contract deployed on ropsten.


## About the Project:
- Smart Contract in Solidity by using OpenZeppelin
- Code verification Etherscan
- Deployment (Ropsten)
- Audit MythX

## Compatibility with existing standards from 
- ERC-20
- EIP-712
- EIP-2612
- EIP-3009

## Token Parameters
- Name = SwissShares
- Symbol = SSI
- Total Supply = 10.000.000
- Contract Name = SwissShares

## Features
- Global freeze (pause all transactions between holders)
- Remove holder (Burn all tokens and remove wallet address from the whitelist)
- Transfer tokens and delegate gas payment (delegate to the admin wallet address to pay the gas fees of transactions)
- Get all holders wallets address (return array of wallets address)
- Transfer tokens (transfer tokens to the provided wallet address)
- Get wallet address balance (return balance of the provided wallet address)
- Get total supply (return the total supply of the token)
- Burn tokens (reduce the total supply of tokens by cancelling existing tokens on the Blockchain)
- Mint new tokens (create new tokens by increasing the total supply to the Blockchain)
- No fraction of token (no fraction in transfer/mind/burn, tokens must have a decimal place set to zero)
- Minimum transfer amount (1.00 token)
- Add/remove wallet address as admin (Only admin can add/remove wallet address and perform admin actions)
- Add/remove wallet wallet in the white list (Only wallet address whitelisted can perform transactions)
- No partial execution (must be executed as a single transaction in the Blockchain)
- Others Related functions
