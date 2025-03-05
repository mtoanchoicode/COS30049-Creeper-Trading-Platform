require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with the account: ${deployer.address}`);

    // Replace these with actual ERC-20 token contract addresses
    const cepTokenAddress = "0x1559368328F951a72da9B7571C6611667dfc72d2"; 
    const lnxTokenAddress = "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9";
    const poolAddress = "0xC59a1C1e0E87fc196d01E1DCA4c91de18f8Ab05c";

    // Deploy SwapETH contract
    const SwapETH = await ethers.getContractFactory("SwapETH");
    const swapETH = await SwapETH.deploy(cepTokenAddress, lnxTokenAddress, poolAddress);
    await swapETH.waitForDeployment(); // Wait for the contract to be deployed

    console.log(`SwapETH deployed at: ${await swapETH.getAddress()}`); // Corrected way to get the contract address
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
