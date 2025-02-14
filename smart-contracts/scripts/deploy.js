const hre = require("hardhat");

async function main() {
  const SendETH = await hre.ethers.getContractFactory("SendETH");
  const sendEth = await SendETH.deploy();

  await sendEth.waitForDeployment(); // Use this instead of deployed()

  console.log(`Contract deployed at: ${await sendEth.getAddress()}`); // Fetch the address properly
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
