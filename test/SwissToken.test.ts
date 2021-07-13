import { expect } from "./chai-setup";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { Contract } from "ethers";

const getTypes = () => {
  return {
    TransferWithAuthorization: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
      { name: "validAfter", type: "uint256" },
      { name: "validBefore", type: "uint256" },
      { name: "nonce", type: "bytes32" },
    ],
  };
};

const getDomain = (verifyingContract: string) => {
  return {
    name: "SwissShares",
    version: "1",
    chainId: 31337,
    verifyingContract,
  };
};

const getMessage = (from: string, to: string) => {
  return {
    from,
    to,
    value: 1000,
    validAfter: 0,
    validBefore: Math.floor(Date.now() / 1000) + 3600,
    nonce: ethers.utils.hexlify(ethers.utils.randomBytes(32))
  };
};

describe("SwissShares", function () {
  let SwissSharesContract: Contract;
  let admin: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let wallet2: SignerWithAddress;
  beforeEach(async () => {
    [admin, wallet1, wallet2] = await ethers.getSigners();
    const SwissSharesContractFacory = await ethers.getContractFactory(
      "SwissShares",
      admin
    );
    SwissSharesContract = await SwissSharesContractFacory.deploy(10000000);
    await SwissSharesContract.deployed();
    await SwissSharesContract.addWalletToWhitelist(wallet1.address);
    await SwissSharesContract.addWalletToWhitelist(wallet2.address);
  });

  it("Should initialize SwissShares", async function () {
    expect(await SwissSharesContract.balanceOf(admin.address)).to.equal(
      10000000
    );
    expect(await SwissSharesContract.name()).to.equal("SwissShares");
    expect(await SwissSharesContract.symbol()).to.equal("SSI");
    expect(await SwissSharesContract.totalSupply()).to.equal(10000000);
    await expect(
      SwissSharesContract.connect(wallet1).totalSupply()
    ).to.be.revertedWith("AdminRole: caller does not have the Admin role");
    expect(await SwissSharesContract.decimals()).to.equal(0);
  });
  describe("Transfer With Authorization", () => {
    it("Success", async () => {
      const domain = getDomain(SwissSharesContract.address);
      const types = getTypes();
      const message = getMessage(wallet1.address, wallet2.address);
      const signature = await wallet1._signTypedData(domain, types, message);
      let verifiedAddress = ethers.utils.verifyTypedData(
        domain,
        types,
        message,
        signature
      );
      const expandedSign = ethers.utils.splitSignature(signature);
      expect(verifiedAddress).to.be.equal(wallet1.address);
      await SwissSharesContract.transfer(wallet1.address, 10000);
      await SwissSharesContract.transferWithAuthorization(
        message.from,
        message.to,
        message.value,
        message.validAfter,
        message.validBefore,
        message.nonce,
        expandedSign.v,
        expandedSign.r,
        expandedSign.s
      );
    });
  });
});

// {
//   types: {
//     TransferWithAuthorization: [
//       { name: 'from', type: 'address' },
//       { name: 'to', type: 'address' },
//       { name: 'value', type: 'uint256' },
//       { name: 'validAfter', type: 'uint256' },
//       { name: 'validBefore', type: 'uint256' },
//       { name: 'nonce', type: 'bytes32' }
//     ],
//     EIP712Domain: [
//       { name: 'name', type: 'string' },
//       { name: 'version', type: 'string' },
//       { name: 'chainId', type: 'uint256' },
//       { name: 'verifyingContract', type: 'address' }
//     ]
//   },
//   domain: {
//     name: 'SwissShares',
//     version: '1',
//     chainId: '31337',
//     verifyingContract: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
//   },
//   primaryType: 'TransferWithAuthorization',
//   message: {
//     from: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
//     to: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
//     value: '1000',
//     validAfter: '0',
//     validBefore: '1626167647',
//     nonce: '0x33a4ca2ce3d00b4efbe6f0249637c2c206ec3eabc7617dcf98b848323b6eb95f'
//   }
// }
