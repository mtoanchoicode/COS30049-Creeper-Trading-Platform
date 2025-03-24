const hre = require("hardhat");

async function main() {
  const nftCollectionAddress = "0x8f580074776FB3254AEFaFb1e2ca985F4F2AE85D"; // Your deployed contract address
  const [owner] = await hre.ethers.getSigners();
  const NFT = await hre.ethers.getContractAt("NFTCollection", nftCollectionAddress);

  console.log(`Minting NFT from owner: ${owner.address}...`);

  // Metadata for single NFT
  const metadataURI = "ipfs://bafkreica37vukrp6rbmzsnnzbt3bcjgqzdumtywqmlngqopmv7odhr2c7i";

  // Mint a single NFT with metadata
  const tx = await NFT.mint(metadataURI);
  await tx.wait();
  console.log("✅ Single NFT Minted with Metadata!");

  // Metadata for batch minting (3 NFTs)
  const metadataURIs = [
    "ipfs://bafkreif3a74kpjnjseayr5zyjsns2rbtxpkdox754l6ifnoy3cf6iaqxyu",
    "ipfs://bafkreicvyacacacfioapdyp7wz5is6exoqc2n2fw5se53vs272h4sml32e",
    "ipfs://bafkreihkoe7chfjprvijy5nb7ogwaggsdchap2bhqrrtqaepzxsuknaymi"
  ];

  // Batch mint 3 NFTs with metadata
  const batchTx = await NFT.batchMint(3, metadataURIs);
  await batchTx.wait();
  console.log("✅ Batch NFTs Minted with Metadata!");

  console.log("Minting completed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
