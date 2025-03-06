const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();  // Get the deployer account

    const CREEPER_POOL_ADDRESS = "0x5b45fb976b4ED18e93412045375b0E8ae0C13955"; 
    const BUY_CONTRACT_ADDRESS = "0xF808D37dc336e225649f7980aCfffcA692A7528e"; 

    // Attach to deployed CreeperPool contract
    const CreeperPool = await ethers.getContractFactory("CreeperPool");
    const creeperPool = await CreeperPool.attach(CREEPER_POOL_ADDRESS);

    console.log(`Approving Buy contract (${BUY_CONTRACT_ADDRESS}) from ${deployer.address}`);

    const tx = await creeperPool.approveBuyContract(
        BUY_CONTRACT_ADDRESS,
    );

    await tx.wait(); // Wait for transaction to be confirmed
    console.log("✅ Approval successful!");
}

// Run script with error handling
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
