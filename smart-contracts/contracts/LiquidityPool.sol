// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract LiquidityPool {
    using SafeERC20 for IERC20;

    address public tokenA;
    address public tokenB;
    AggregatorV3Interface public priceFeedA;
    AggregatorV3Interface public priceFeedB;
    uint256 public constant FEE_PERCENT = 3; // 0.3% fee
    address public owner;

    event SwapCompleted(address indexed user, address indexed fromToken, address indexed toToken, uint256 amountIn, uint256 amountOut, uint256 fee);

    constructor(address _tokenA, address _tokenB, address _priceFeedA, address _priceFeedB) {
        owner = msg.sender;
        tokenA = _tokenA;
        tokenB = _tokenB;
        priceFeedA = AggregatorV3Interface(_priceFeedA);
        priceFeedB = AggregatorV3Interface(_priceFeedB);
    }
    
    function getLatestPrice(AggregatorV3Interface priceFeed) public view returns (uint256) {
        if (address(priceFeed) == address(0)) {
            return 1e8; 
        }
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price from oracle");
        return uint256(price);
    }
    
    function swap(address fromToken, address toToken, uint256 amountIn) external returns (uint256 amountOut) {
        require(fromToken == tokenA || fromToken == tokenB, "Invalid token");

        bool isTokenA = fromToken == tokenA;
        AggregatorV3Interface priceFeedIn = isTokenA ? priceFeedA : priceFeedB;
        AggregatorV3Interface priceFeedOut = isTokenA ? priceFeedB : priceFeedA;

        uint256 priceIn = getLatestPrice(priceFeedIn);
        uint256 priceOut = getLatestPrice(priceFeedOut);

        uint256 amountOutRaw = (amountIn * priceIn) / priceOut;
        uint256 fee = (amountOutRaw * FEE_PERCENT) / 1000;
        amountOut = amountOutRaw - fee;

        require(amountOut > 0, "Swap amount too low");
        require(IERC20(toToken).balanceOf(address(this)) >= amountOut, "Insufficient liquidity");

        IERC20(toToken).safeTransfer(msg.sender, amountOut); 

        emit SwapCompleted(msg.sender, fromToken, toToken, amountIn, amountOut, fee);
    }

    function approveContract(address spender) external {
        require(msg.sender == owner, "Only owner can approve");
        IERC20(tokenA).approve(spender, type(uint256).max); 
        IERC20(tokenB).approve(spender, type(uint256).max);
    }
}
