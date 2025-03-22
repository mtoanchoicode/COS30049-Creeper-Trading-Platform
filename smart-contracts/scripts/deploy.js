const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);

    const SwapContract = await hre.ethers.getContractFactory("SwapContract");
    const swapContract = await SwapContract.deploy();
    await swapContract.waitForDeployment();
    const swapContractAddress = await swapContract.getAddress(); // ✅ Correct way to get address in Hardhat v6+
    console.log("SwapContract deployed at:", swapContractAddress);

    const LiquidityPool = await hre.ethers.getContractFactory("LiquidityPool");

    const tokenPairs = [
        ["LINK", "WBTC"],
        ["LINK", "USDT"],
        ["LINK", "ETH"],
        ["ETH", "USDT"],
        ["ETH", "WBTC"],
        ["WBTC", "USDT"]
    ];

    const tokenAddresses = {
        LINK: "0x860e57dD7c2eA7d9D4b05598B0a3A8668B8c2d62",
        WBTC: "0x0919d20cC9DEf0d60D860030C247BD213a0A22b0",
        USDT: "0x4B381C5B09482C10feAB7730b21Cf97D1d45EBd1",
        ETH: "0x5F29D014a869Ce3869c841790f5E1dEcfb273468",
    };

    const priceFeeds = {
        LINK: "0xc59E3633BAAC79493d908e63626716e204A45EdF",
        WBTC: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
        USDT: "0x0000000000000000000000000000000000000000",
        ETH: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    };

    for (const [tokenA, tokenB] of tokenPairs) {
        console.log(`Deploying LiquidityPool for ${tokenA}/${tokenB}...`);
        const pool = await LiquidityPool.deploy(
            tokenAddresses[tokenA],
            tokenAddresses[tokenB],
            priceFeeds[tokenA],
            priceFeeds[tokenB]
        );
        await pool.waitForDeployment();
        const poolAddress = await pool.getAddress();
        console.log(`LiquidityPool ${tokenA}/${tokenB} deployed at:`, poolAddress);

        console.log(`Registering LiquidityPool ${tokenA}/${tokenB} with SwapContract...`);
        const tx = await swapContract.registerPool(tokenAddresses[tokenA], tokenAddresses[tokenB], poolAddress);
        await tx.wait();
        console.log(`LiquidityPool ${tokenA}/${tokenB} registered!`);
    }

    console.log("✅ All pools deployed and registered!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Error during deployment:", error);
        process.exit(1);
    });
