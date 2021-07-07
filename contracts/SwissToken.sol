//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./lib/Admin.sol";
import "./lib/Whitelist.sol";
import "hardhat/console.sol";

contract SwissToken is ERC20, Admin, Whitelist {
  uint256 private constant MAX_AMOUNT = 100000;
  uint256 private constant MIN_AMOUNT = 1;

  mapping(address => uint256) private _tokenHolders;
  address[] private _holders;

  constructor(uint256 initialSupply)
    ERC20("SwissToken", "SWT")
    Admin()
    Whitelist()
  {
    _mint(_msgSender(), initialSupply);
  }

  /**
   * @dev returns the number of decimals used to get the user representation
   *
   * See {ERC20-decimals}.
   */
  function decimals() public pure override returns (uint8) {
    return 0;
  }

  /**
   * @dev See {ERC20-totalSupply}.
   */
  function totalSupply() public view override onlyAdmin returns (uint256) {
    return super.totalSupply();
  }

  /**
   * @dev Creates `amount` of new tokens and assigns them to the caller.
   *
   * See {ERC20-_mint}.
   */
  function mint(uint256 amount) public virtual onlyAdmin {
    _mint(_msgSender(), amount);
  }

  /**
   * @dev Destroys `amount` tokens from the caller.
   *
   * See {ERC20-_burn}.
   */
  function burn(uint256 amount) public virtual onlyAdmin {
    _burn(_msgSender(), amount);
  }

  /**
   * @dev Adds an `account` to Whitlisted account list
   *
   * See {Whitelist-_add}.
   */
  function addWalletToWhitelist(address account) public onlyAdmin {
    _add(account);
  }

  /**
   * @dev Removes an `account` to Whitlisted account list
   *
   * See {Whitelist-_remove}.
   */
  function removeWalletFromWhitelist(address account) public onlyAdmin {
    _remove(account);
  }

  function getAllTokenHolders()
    public
    view
    onlyAdmin
    returns (address[] memory)
  {
    return _holders;
  }

  /**
   * @dev Override this method in order to check some conditions before any transfer
   */
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override {
    super._beforeTokenTransfer(from, to, amount);
    require(
      amount >= MIN_AMOUNT,
      "SwissToken: Minimum amount should be more than 1"
    );
    require(
      amount < MAX_AMOUNT,
      "SwissToken: Maximum amount exceeded for transfer"
    );
    require(amount % 1 == 0, "SwissToken: Can't transfer fractional amount");
    if (from == address(0)) {
      // Mint call
      require(isWalletWhitelisted(to), "SwissToken: Receiver is not whitelisted");
    } else if (to == address(0)) {
      // Burn call
      require(isWalletWhitelisted(from), "SwissToken: Sender is not whitelisted");
    } else {
      require(isWalletWhitelisted(from), "SwissToken: Sender is not whitelisted");
      require(isWalletWhitelisted(to), "SwissToken: Receiver is not whitelisted");
    }
    
    if (_tokenHolders[to] == 0) {
      _holders.push(to);
    }
    _tokenHolders[to] += amount;
  }
}
