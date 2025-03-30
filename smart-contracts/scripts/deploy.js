const { ethers } = require("hardhat");

async function main() {
  const CreeperMarketplace = await ethers.getContractFactory(
    "CreeperMarketplace"
  );
  const creeperMarketplace = await CreeperMarketplace.deploy();

  await creeperMarketplace.waitForDeployment(); // Corrected method

  console.log(
    `NFTCollection deployed to: ${await creeperMarketplace.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
