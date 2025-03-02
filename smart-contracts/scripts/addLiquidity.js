const hre = require("hardhat");

async function main() {
    const [signer] = await hre.ethers.getSigners();

    const creepToken = new hre.ethers.Contract(CREEP_ADDRESS, IERC20_ABI, signer);
    const lnxToken = new hre.ethers.Contract(LNX_ADDRESS, IERC20_ABI, signer);
    const pool = new hre.ethers.Contract(LIQUIDITY_POOL_ADDRESS, LIQUIDITY_POOL_ABI, signer);

    // Fetch user balance
    const CEP_Balance = await creepToken.balanceOf(signer.address);
    const lNX_Balance = await lnxToken.balanceOf(signer.address);

    console.log(`Creep Balance: ${hre.ethers.utils.formatUnits(CEP_Balance, 18)}`);
    console.log(`LNX Balance: ${hre.ethers.utils.formatUnits(lNX_Balance, 18)}`);

    const amountCEP = CEP_Balance.div(4); // Add 25% of balance
    const amountLNX = lNX_Balance.div(4);

    // Approve contract to use tokens
    await creepToken.approve(LIQUIDITY_POOL_ADDRESS, amountCEP);
    await lnxToken.approve(LIQUIDITY_POOL_ADDRESS, amountLNX);

  
    const tx = await pool.addLiquidity(amountCEP, amountLNX);
    await tx.wait();
  
    console.log("Liquidity added successfully!");
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  