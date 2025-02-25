const hre = require("hardhat");

async function main() {
  const CreeperToken = await hre.ethers.getContractFactory("CreeperToken");
  const creeperToken = await CreeperToken.deploy();

  await creeperToken.waitForDeployment(); // Use this instead of deployed()

  console.log(`CreeperToken deployed at: ${await creeperToken.getAddress()}`); // Fetch the address properly
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
