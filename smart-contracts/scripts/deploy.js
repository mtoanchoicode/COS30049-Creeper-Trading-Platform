const { ethers } = require("hardhat");

//Deploy script
async function main() {
  // Replace with actual token addresses
  const lnx = "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9";
  const cep = "0x1559368328F951a72da9B7571C6611667dfc72d2";
  const wbtc = "0x0919d20cC9DEf0d60D860030C247BD213a0A22b0";
  const link = "0x860e57dD7c2eA7d9D4b05598B0a3A8668B8c2d62";
  const usdt = "0x4B381C5B09482C10feAB7730b21Cf97D1d45EBd1";
  const eth = "0x5F29D014a869Ce3869c841790f5E1dEcfb273468";

  const TokenFaucet = await hre.ethers.getContractFactory("TokenFaucet");
  const faucet = await TokenFaucet.deploy(lnx, cep, wbtc, link, usdt, eth);

  await faucet.waitForDeployment(); // Updated for Ethers.js v6+
  console.log("faucet deployed to:", await faucet.getAddress()); // Use getAddress() instead of .address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
