const { ethers } = require("hardhat");

async function main() {
  const collectionName = "Vell mobile"; // Replace with desired name
  const symbol = "VEO"; // Replace with your NFT symbol

  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const nftCollection = await NFTCollection.deploy(collectionName, symbol);

  await nftCollection.waitForDeployment(); // Corrected method

  console.log(`NFTCollection deployed to: ${await nftCollection.getAddress()}`);

    // //Deploy CollectionFactory contract
    // const CollectionFactory = await hre.ethers.getContractFactory("CollectionFactory");
    // const collectionFactory = await CollectionFactory.deploy();
    
    // await collectionFactory.waitForDeployment();

    // console.log(`CollectionFactory deployed at: ${await collectionFactory.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
