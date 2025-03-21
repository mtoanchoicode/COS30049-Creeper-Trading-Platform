// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract LiquidityPool {
    address public tokenA;
    address public tokenB;
    AggregatorV3Interface public priceFeedA;
    AggregatorV3Interface public priceFeedB;
    uint256 public constant FEE_PERCENT = 3; // 0.3% fee
    
    constructor(address _tokenA, address _tokenB, address _priceFeedA, address _priceFeedB) {
        tokenA = _tokenA;
        tokenB = _tokenB;
        priceFeedA = AggregatorV3Interface(_priceFeedA);
        priceFeedB = AggregatorV3Interface(_priceFeedB);
    }
    
    function getLatestPrice(AggregatorV3Interface priceFeed) public view returns (uint256) {
        if (address(priceFeed) == address(0)) {
            return 1e8; // Assuming USDT is always $1
        }
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price from oracle");
        return uint256(price);
    }
    
    function swap(address fromToken, uint256 amountIn) external returns (uint256 amountOut) {
        require(fromToken == tokenA || fromToken == tokenB, "Invalid token");
        
        bool isTokenA = fromToken == tokenA;
        address toToken = isTokenA ? tokenB : tokenA;
        AggregatorV3Interface priceFeedIn = isTokenA ? priceFeedA : priceFeedB;
        AggregatorV3Interface priceFeedOut = isTokenA ? priceFeedB : priceFeedA;
        
        uint256 priceIn = getLatestPrice(priceFeedIn);
        uint256 priceOut = getLatestPrice(priceFeedOut);
        
        uint256 amountOutRaw = (amountIn * priceIn) / priceOut;
        uint256 fee = (amountOutRaw * FEE_PERCENT) / 1000;
        amountOut = amountOutRaw - fee;
        
        IERC20(fromToken).transferFrom(msg.sender, address(this), amountIn);
        IERC20(toToken).transfer(msg.sender, amountOut);
    }
}
