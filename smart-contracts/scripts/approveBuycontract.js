const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();  // Get the deployer account

    const CREEPER_POOL_ADDRESS = "0x551d6A53CB243E3718257001065Cf8d29F8cdCb8"; 
    const BUY_CONTRACT_ADDRESS = "0x8Ac96B30B627F8E6FEFFD40C662c88949a5de140"; 

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
