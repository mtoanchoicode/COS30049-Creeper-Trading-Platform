const { ethers } = require("hardhat");

async function main() {
  const collectionName = "Nguyen Hoang Trung"; // Replace with desired name
  const symbol = "NHT"; // Replace with your NFT symbol

  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const nftCollection = await NFTCollection.deploy(collectionName, symbol);

  await nftCollection.waitForDeployment(); // Corrected method

  console.log(`NFTCollection deployed to: ${await nftCollection.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});