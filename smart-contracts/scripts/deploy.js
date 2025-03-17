const { ethers } = require("hardhat");

//Deploy script
async function main() {
  const PriceFeed = await hre.ethers.getContractFactory("PriceFeed");
  const priceFeed = await PriceFeed.deploy();

  await priceFeed.waitForDeployment(); // Updated for Ethers.js v6+
  console.log("PriceFeed deployed to:", await priceFeed.getAddress()); // Use getAddress() instead of .address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
