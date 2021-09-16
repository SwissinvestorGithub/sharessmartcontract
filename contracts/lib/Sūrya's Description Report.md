 Sūrya's Description Report

 Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| c:\xampp\htdocs\sharessmartcontract\contracts\SwissShares.sol | 26571c0df935307b391cbd0a015646e4db828b09 |


 Contracts Description Table


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **SwissShares** | Implementation | ERC20Pausable, EIP2612, EIP3009, Admin, Whitelist |||
| └ | <Constructor> | Public ❗️ | 🛑  | ERC20 Admin Whitelist |
| └ | decimals | Public ❗️ |   |NO❗️ |
| └ | addAdmin | Public ❗️ | 🛑  | onlyAdmin whenNotPaused |
| └ | removeAdmin | Public ❗️ | 🛑  | onlyAdmin whenNotPaused |
| └ | mint | Public ❗️ | 🛑  | onlyAdmin whenNotPaused |
| └ | burn | Public ❗️ | 🛑  | onlyAdmin whenNotPaused |
| └ | addWalletToWhitelist | Public ❗️ | 🛑  | onlyAdmin whenNotPaused |
| └ | removeWalletFromWhitelist | Public ❗️ | 🛑  | onlyAdmin whenNotPaused |
| └ | getAllTokenHolders | Public ❗️ |   |NO❗️ |
| └ | pauseTransfers | Public ❗️ | 🛑  | onlyAdmin whenNotPaused |
| └ | unPauseTransfers | Public ❗️ | 🛑  | onlyAdmin whenPaused |
| └ | freezeTransfersFromWallet | Public ❗️ | 🛑  | onlyAdmin whenNotPaused |
| └ | _beforeTokenTransfer | Internal 🔒 | 🛑  | |
| └ | _afterTokenTransfer | Internal 🔒 | 🛑  | |
| └ | authTransfer | Internal 🔒 | 🛑  | |
| └ | permitApprove | Internal 🔒 | 🛑  | |


 Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |
