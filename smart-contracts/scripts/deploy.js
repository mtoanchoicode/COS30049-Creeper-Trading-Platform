const hre = require("hardhat");

async function main() {
  const SendETH = await hre.ethers.getContractFactory("SendETH");
  const sendEth = await SendETH.deploy();
  await sendEth.deployed();

  console.log(`Contract deployed at: ${sendEth.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
