import { expect } from "./chai-setup";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { Contract } from "ethers";

describe("SwissToken", function () {
  let SwissTokenContract: Contract;
  let admin: SignerWithAddress;
  let wallet1: SignerWithAddress;
  beforeEach(async () => {
    [admin, wallet1] = await ethers.getSigners();
    const SwissTokenContractFacory = await ethers.getContractFactory(
      "SwissToken",
      admin
    );
    SwissTokenContract = await SwissTokenContractFacory.deploy(10000);
    await SwissTokenContract.deployed();
  });

  it("Should initialize SwissToken", async function () {
    expect(await SwissTokenContract.balanceOf(admin.address)).to.equal(10000);
    expect(await SwissTokenContract.name()).to.equal("SwissToken");
    expect(await SwissTokenContract.symbol()).to.equal("SWT");
    expect(await SwissTokenContract.totalSupply()).to.equal(10000);
    await expect(
      SwissTokenContract.connect(wallet1).totalSupply()
    ).to.be.revertedWith("AdminRole: caller does not have the Admin role");
    expect(await SwissTokenContract.decimals()).to.equal(0);
  });
});
