// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./LiquidityPool.sol";

contract SwapContract {
    using SafeERC20 for IERC20;

    mapping(address => mapping(address => address)) public pools;

    event PoolRegistered(address indexed tokenA, address indexed tokenB, address pool);
    event SwapExecuted(address indexed user, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut);

    function registerPool(address tokenA, address tokenB, address pool) external {
        require(pool != address(0), "Invalid pool address");
        require(pools[tokenA][tokenB] == address(0), "Pool already exists");

        pools[tokenA][tokenB] = pool;
        pools[tokenB][tokenA] = pool;

        emit PoolRegistered(tokenA, tokenB, pool);
    }

    function swap(address tokenIn, address tokenOut, uint256 amountIn) external {
        address pool = pools[tokenIn][tokenOut];
        require(pool != address(0), "Pool not found");

        IERC20(tokenIn).safeTransferFrom(msg.sender, pool, amountIn);
        uint256 amountOut = LiquidityPool(pool).swap(tokenIn, tokenOut, amountIn); // ✅ Gửi đầy đủ tham số
        IERC20(tokenOut).safeTransfer(msg.sender, amountOut);

        emit SwapExecuted(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
    }
}
