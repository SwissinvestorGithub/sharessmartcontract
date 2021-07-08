# sharessmartcontract
Swissinvestor Shares Smart Contract

About the Project:
- Smart Contract in Solidity by using OpenZeppelin
- Code verification Etherscan
- Deployment (Ropsten)

Compatibility with existing standards from 
- ERC-20
- EIP-2612
- EIP-3009
- ERC-1404

Token Parameters
- Name = SwissShares
- Symbol = SSI
- Total Supply = 10.000.000
- Contract Name = SwissShares

Features
- Global freeze (pause all transactions between holders of the provided token)
- Wallet freeze (freeze all tokens of a specific wallet)
- Gas payment (delegate to the admin wallet to pay the gas fees of transactions)
- Get all holders wallets (return array of wallets)
- Transfer tokens (transfer tokens to the provided wallet)
- Get address details (return balance of the provided wallet)
- Get total supply (return the total supply of the provided token from blockchain)
- Burn tokens (reduce the total supply of tokens by cancelling existing tokens on the ETH address)
- Mint new tokens (create new tokens by increasing the total supply to the ETH address)
- No fraction of token (no fraction in transfer/mind/burn, tokens must have a decimal place set to zero)
- Wallet white list (return true/false to the provided wallet)
- Add/remove wallet in the white list ()
- No partial execution (must be executed as a single transaction in the blockchain)
- Related functions

Etherscan Account
- Username = Swissinvestor
- Email = cezar.souza@swissinvestor.ch
- Api-Key Token = 645FAQ6CV75S9B17HZZAY3335J39SQQ1BB

Ethereum Wallets
- Wallet1 = 0x2dA95aD603D4C23b3EfBEDb3eD4e7484D26f2Fc5 
- The 1st wallet will be controlled by the admin. 

- Wallet2 = 0xd1bfB1DaF062B4fd3dFDCd192bE5A648d919a327
- The 2nd wallet will be controlled by the manager. 
