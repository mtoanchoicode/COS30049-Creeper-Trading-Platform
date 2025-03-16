const { ethers } = require("hardhat");

async function main() {
  const USDT = "0x4B381C5B09482C10feAB7730b21Cf97D1d45EBd1";
  const LINK = "0x860e57dD7c2eA7d9D4b05598B0a3A8668B8c2d62";
  const PRICE_FEED = "0xc59E3633BAAC79493d908e63626716e204A45EdF";

  console.log("Deploying SwapContract...");

  const SwapContract = await ethers.getContractFactory("SwapContract");
  const swap = await SwapContract.deploy(USDT, LINK, PRICE_FEED);

  await swap.waitForDeployment();
  console.log("SwapContract deployed to:", await swap.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
