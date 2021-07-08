import { expect } from "./chai-setup";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { Contract } from "ethers";

describe("SwissShares", function () {
  let SwissSharesContract: Contract;
  let admin: SignerWithAddress;
  let wallet1: SignerWithAddress;
  beforeEach(async () => {
    [admin, wallet1] = await ethers.getSigners();
    const SwissSharesContractFacory = await ethers.getContractFactory(
      "SwissShares",
      admin
    );
    SwissSharesContract = await SwissSharesContractFacory.deploy(10000000);
    await SwissSharesContract.deployed();
  });

  it("Should initialize SwissShares", async function () {
    expect(await SwissSharesContract.balanceOf(admin.address)).to.equal(10000000);
    expect(await SwissSharesContract.name()).to.equal("SwissShares");
    expect(await SwissSharesContract.symbol()).to.equal("SSI");
    expect(await SwissSharesContract.totalSupply()).to.equal(10000000);
    await expect(
      SwissSharesContract.connect(wallet1).totalSupply()
    ).to.be.revertedWith("AdminRole: caller does not have the Admin role");
    expect(await SwissSharesContract.decimals()).to.equal(0);
  });
});
