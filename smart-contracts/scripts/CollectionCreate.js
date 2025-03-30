// const hre = require("hardhat");

// async function main() {
//     const ABI = [
        
//         {
//             "inputs": [],
//             "stateMutability": "nonpayable",
//             "type": "constructor"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "tokenAddress",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "name",
//                 "type": "string"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "symbol",
//                 "type": "string"
//             }
//             ],
//             "name": "TokenCreated",
//             "type": "event"
//         },
//         {
//             "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "name",
//                 "type": "string"
//             },
//             {
//                 "internalType": "string",
//                 "name": "symbol",
//                 "type": "string"
//             }
//             ],
//             "name": "createToken",
//             "outputs": [],
//             "stateMutability": "payable",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "owner",
//             "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         }
//       ];


//   const Address = "0x37F5344c7A3eb251086A91aa6D4Dc11227e8d536";

//   const create = await hre.ethers.getContractAt("CollectionFactory", Address);

//   const tx = await create.createToken("Vell Gờ", "Veo");
  
//   const receipt = await tx.wait();

//     // Extract token address from the event logs
//     const event = receipt.logs.find(
//         (log) => log.address === Address
//     );

//     if (event) {
//         const iface = new ethers.Interface(ABI);
//         const decodedLog = iface.parseLog(event);
//         const newTokenAddress = decodedLog.args.tokenAddress;

//   console.log(`adress: ${newTokenAddress}`);
//   console.log(`Create collection Successfully!`);
//     }
//     else {
//         console.log(`Create collection Failed!`);
//     };
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
