const { ethers } = require("hardhat");

async function main() {
<<<<<<< HEAD
  const CreeperMarketplace = await ethers.getContractFactory(
    "CreeperMarketplace"
  );
  const creeperMarketplace = await CreeperMarketplace.deploy();
=======
  const collectionName = "Nguyen Hoang Trung"; // Replace with desired name
  const symbol = "NHT"; // Replace with your NFT symbol
>>>>>>> de51253b2b91e0d1044bdf85cd5ef4e32f70e27e

  await creeperMarketplace.waitForDeployment(); // Corrected method

  console.log(
    `NFTCollection deployed to: ${await creeperMarketplace.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});