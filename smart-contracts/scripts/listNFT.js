const hre = require("hardhat");

async function main() {
  const marketplaceAddress = "0xDf74fA6f7f714B3eBdCF2d7f9c8B00cE2A8c2132";
  const nftAddress = "0x83b56a77e4502f3FEee2225EDbF98D7B01C9a9BE";
  const tokenId = 2; // Change to your NFT token ID

  const [deployer] = await hre.ethers.getSigners();
  console.log(`Using deployer address: ${deployer.address}`);

  const nftContract = await hre.ethers.getContractAt("IERC721", nftAddress, deployer);
  const marketplaceContract = await hre.ethers.getContractAt("NFTMarketplace", marketplaceAddress, deployer);

  const owner = await nftContract.ownerOf(tokenId);
  if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
    console.error(`❌ ERROR: You do not own this NFT. Current owner is ${owner}`);
    return;
  }

  // ✅ Ensure marketplace is approved
  console.log("Approving marketplace...");
  const approvalTx = await nftContract.approve(marketplaceAddress, tokenId);
  await approvalTx.wait();
  console.log("✅ Marketplace approved to transfer NFT");

  // ✅ List the NFT with a price
  const price = hre.ethers.parseUnits("0.0005", "ether");
  console.log(`Listing NFT for ${hre.ethers.formatEther(price)} ETH...`);
  
  const listTx = await marketplaceContract.listNFT(nftAddress, tokenId, price);
  await listTx.wait();
  
  console.log(`✅ NFT successfully listed for ${hre.ethers.formatEther(price)} ETH!`);
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exitCode = 1;
});
