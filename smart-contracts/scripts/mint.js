const hre = require("hardhat");

async function main() {
  const nftCollectionAddress = "0x9Fd776F3C7614D1761A03E75b9A9d90DE2E02473"; // Your deployed contract address
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
  // const metadataURIs = [
  //   "ipfs://bafkreidptr2sqokjod55rkzuefxhib36bye5ksly3og3f2z2pdveoffdoq",
  //   "ipfs://bafkreifkfqn47ydq7xtuz2tvil5mzbtyv7ejrgovwsmwao26bdqahmpxfi",
  //   "ipfs://bafkreienddww7gpakjv7ijn473mi7ocd4ashzheh5qq7d5zrxf2msw2yhq",
  //   "ipfs://bafkreidzlt2nsc5cetnwrqg6n7erb2oacph4s2keii7g4ronfzvcyrqete",
  //   "ipfs://bafkreiew3kyxr6b7u22y3jqav2ud4lxcvpzztiddyakj7pgzjue7cuarfa",
  // ];

  // // Batch mint 3 NFTs with metadata
  // const batchTx = await NFT.batchMint(5, metadataURIs);
  // await batchTx.wait();
  // console.log("✅ Batch NFTs Minted with Metadata!");

  console.log("Minting completed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
