const hre = require("hardhat");

async function main() {
  const marketplaceAddress = "0xDf74fA6f7f714B3eBdCF2d7f9c8B00cE2A8c2132";
  const nftAddress = "0x83b56a77e4502f3FEee2225EDbF98D7B01C9a9BE";
  const tokenId = 2; // Change to the NFT you want to buy

  const Marketplace = await hre.ethers.getContractAt("NFTMarketplace", marketplaceAddress);
  const price = hre.ethers.parseUnits("0.0005", "ether");

  const tx = await Marketplace.buyNFT(nftAddress, tokenId, { value: price });
  await tx.wait();

  console.log(`NFT Purchased Successfully!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
