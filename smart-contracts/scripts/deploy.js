const hre = require("hardhat");

async function main() {
  const lnxToken = "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"; // Your LNX Token Address
  const cepToken = "0x1559368328F951a72da9B7571C6611667dfc72d2"; // Your CEP Token Address

  const TokenFaucet = await hre.ethers.getContractFactory("TokenFaucet");
  const tokenFaucet = await TokenFaucet.deploy(lnxToken, cepToken);

  await tokenFaucet.waitForDeployment(); // Use this instead of deployed()

  console.log(`tokenFaucet deployed at: ${await tokenFaucet.getAddress()}`); // Fetch the address properly
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
