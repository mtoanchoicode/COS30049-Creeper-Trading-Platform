require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const lnxToken = "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"; // Your LNX Token Address
  const cepToken = "0x1559368328F951a72da9B7571C6611667dfc72d2"; // Your CEP Token Address
  const pool = "0x551d6A53CB243E3718257001065Cf8d29F8cdCb8";

  
  // const SwapToken = await ethers.getContractFactory("SwapToken"); // Correct contract name
  // const swapToken = await SwapToken.deploy(lnxToken, cepToken);

  // const pool = await ethers.getContractFactory("CreeperPool"); // Correct contract name
  // const deployPool = await pool.deploy(cepToken, lnxToken);

  const buyContract = await ethers.getContractFactory("Buy"); // Correct contract name
  const buy = await buyContract.deploy(cepToken, lnxToken, pool);

  await buy.waitForDeployment(); // Corrected variable

  console.log(`Pool deployed at: ${await buy.getAddress()}`); // Properly fetch contract address
}

// Call main() outside the function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
