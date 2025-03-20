// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.19;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// contract SwapContract {
//     IERC20 public USDT;
//     IERC20 public LINK;
//     AggregatorV3Interface public priceFeed;
//     address public owner;
//     uint256 public feePercent = 30; // 0.3% fee (30 / 10000)

//     event Swap(address indexed user, uint256 usdtAmount, uint256 linkAmount);
//     event LiquidityAdded(address indexed owner, uint256 usdtAmount, uint256 linkAmount);

//     constructor(address _usdt, address _link, address _priceFeed) {
//         USDT = IERC20(_usdt);
//         LINK = IERC20(_link);
//         priceFeed = AggregatorV3Interface(_priceFeed);
//         owner = msg.sender;
//     }

//     function getLatestPrice() public view returns (uint256) {
//         (, int256 price, , , ) = priceFeed.latestRoundData();
//         require(price > 0, "Invalid price from oracle");
//         return uint256(price);
//     }

//     function swapUSDTForLINK(uint256 usdtAmount) public {
//         require(USDT.balanceOf(msg.sender) >= usdtAmount, "Not enough USDT");
//         uint256 linkAmount = (usdtAmount * 10**8) / getLatestPrice();
//         uint256 fee = (linkAmount * feePercent) / 10000; // 0.3% fee
//         uint256 netLinkAmount = linkAmount - fee;
//         require(LINK.balanceOf(address(this)) >= netLinkAmount, "Not enough LINK liquidity");

//         // Transfer USDT from user to contract
//         USDT.transferFrom(msg.sender, address(this), usdtAmount);

//         // Send LINK to user after fee deduction
//         LINK.transfer(msg.sender, netLinkAmount);

//         // Keep the fee in the contract
//         emit Swap(msg.sender, usdtAmount, netLinkAmount);
//     }

//     function addLiquidity(uint256 usdtAmount, uint256 linkAmount) public {
//         require(msg.sender == owner, "Only owner can add liquidity");
//         USDT.transferFrom(msg.sender, address(this), usdtAmount);
//         LINK.transferFrom(msg.sender, address(this), linkAmount);
//         emit LiquidityAdded(msg.sender, usdtAmount, linkAmount);
//     }
// }
