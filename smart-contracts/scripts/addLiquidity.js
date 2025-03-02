const hre = require("hardhat");

async function main() {
    const contractAddress = "";
    const pool = await hre.ethers.getContractAt("Buy", contractAddress);
  
    const amountCEP = hre.ethers.utils.parseEther("50000");
    const amountLNX = hre.ethers.utils.parseEther("75000");
  
    const tx = await pool.addLiquidity(amountCEP, amountLNX);
    await tx.wait();
  
    console.log("Liquidity added successfully!");
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  