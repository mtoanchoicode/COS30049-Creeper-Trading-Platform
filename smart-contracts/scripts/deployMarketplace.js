const hre = require("hardhat");

async function main() {
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  // Use `waitForDeployment()` instead of `.deployed()`
  await marketplace.waitForDeployment();

  console.log("Marketplace Contract deployed to:", await marketplace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
