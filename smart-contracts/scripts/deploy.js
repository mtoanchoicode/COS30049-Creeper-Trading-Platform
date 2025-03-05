const hre = require("hardhat");

async function main() {
  const lnxToken = "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"; // Your LNX Token Address
  const cepToken = "0x1559368328F951a72da9B7571C6611667dfc72d2"; // Your CEP Token Address
  const poolAdress = "0x5b45fb976b4ED18e93412045375b0E8ae0C13955";

  // const TokenFaucet = await hre.ethers.getContractFactory("TokenFaucet");
  // const tokenFaucet = await TokenFaucet.deploy(lnxToken, cepToken);

  // await tokenFaucet.waitForDeployment(); // Use this instead of deployed()
  // console.log(`tokenFaucet deployed at: ${await tokenFaucet.getAddress()}`); // Fetch the address properly


  // Deploy the CreeperPool contract
  // const CreeperPool = await hre.ethers.getContractFactory("CreeperPool")
  // const creeperPool = await CreeperPool.deploy(cepToken, lnxToken);

  // await creeperPool.waitForDeployment();
  // console.log(`CreeperPool deployed to: ${await creeperPool.getAddress()}`);


  // // Deploy Buy contract using the CreeperPool address
  const Buy = await hre.ethers.getContractFactory("Buy");
  const buy = await Buy.deploy(cepToken, lnxToken, poolAdress);

  await buy.waitForDeployment();
  console.log(`Buy deployed to: ${await buy.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
