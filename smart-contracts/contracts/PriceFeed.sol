// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// contract PriceFeed {
//     AggregatorV3Interface internal ethUsdPriceFeed;
//     AggregatorV3Interface internal btcUsdPriceFeed;
//     AggregatorV3Interface internal daiUsdPriceFeed;
//     AggregatorV3Interface internal linkUsdPriceFeed;

//     constructor() {
//         ethUsdPriceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
//         btcUsdPriceFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
//         daiUsdPriceFeed = AggregatorV3Interface(0x14866185B1962B63C3Ea9E03Bc1da838bab34C19);
//         linkUsdPriceFeed = AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF);
//     }

//     function getLatestEthPrice() public view returns (int) {
//         (, int price, , , ) = ethUsdPriceFeed.latestRoundData();
//         return price;
//     }

//     function getLatestBtcPrice() public view returns (int) {
//         (, int price, , , ) = btcUsdPriceFeed.latestRoundData();
//         return price;
//     }

//     function getLatestDaiPrice() public view returns (int) {
//         (, int price, , , ) = daiUsdPriceFeed.latestRoundData();
//         return price;
//     }

//     function getLatestLinkPrice() public view returns (int) {
//         (, int price, , , ) = linkUsdPriceFeed.latestRoundData();
//         return price;
//     }
// }
