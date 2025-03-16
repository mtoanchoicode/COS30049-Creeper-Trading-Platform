require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const initialFee = ethers.parseEther("0.001"); // Initial fee of 0.001 ETH
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy(initialFee);

  await tokenFactory.waitForDeployment(); // Corrected variable

  console.log(`tokenFactory deployed at: ${await tokenFactory.getAddress()}`); // Properly fetch contract address
}

// Call main() outside the function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
