require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
<<<<<<< HEAD
  const lnxToken = "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"; // Your LNX Token Address
  const cepToken = "0x1559368328F951a72da9B7571C6611667dfc72d2"; // Your CEP Token Address

  const SendETHWithFee = await hre.ethers.getContractFactory("SendETHWithFee");
  const sendETHWithFee = await SendETHWithFee.deploy();

  await sendETHWithFee.waitForDeployment(); // Use this instead of deployed()

  console.log(
    `sendETHWithFee deployed at: ${await sendETHWithFee.getAddress()}`
  ); // Fetch the address properly
=======
  const CreeperToken = await hre.ethers.getContractFactory("CreeperToken");
  const creeperToken = await CreeperToken.deploy();

  await creeperToken.waitForDeployment(); // Use this instead of deployed()

  console.log(`CreeperToken deployed at: ${await creeperToken.getAddress()}`); // Fetch the address properly
>>>>>>> a7d6687665be20da9f917c18705981e6bc0adecc
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
