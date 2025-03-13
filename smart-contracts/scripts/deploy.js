require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const lnxToken = "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"; // Your LNX Token Address
  const cepToken = "0x1559368328F951a72da9B7571C6611667dfc72d2"; // Your CEP Token Address

  const SwapToken = await ethers.getContractFactory("SwapToken"); // Correct contract name
  const swapToken = await SwapToken.deploy(lnxToken, cepToken);

  await swapToken.waitForDeployment(); // Corrected variable

  console.log(`SwapToken deployed at: ${await swapToken.getAddress()}`); // Properly fetch contract address
}

// Call main() outside the function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
