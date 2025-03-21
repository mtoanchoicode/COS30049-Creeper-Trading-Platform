// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LiquidityPool.sol";

contract SwapContract {
    mapping(address => mapping(address => address)) public pools;
    
    function registerPool(address tokenA, address tokenB, address pool) external {
        pools[tokenA][tokenB] = pool;
        pools[tokenB][tokenA] = pool;
    }
    
    function swap(address tokenIn, address tokenOut, uint256 amountIn) external {
        address pool = pools[tokenIn][tokenOut];
        require(pool != address(0), "Pool not found");
        
        LiquidityPool(pool).swap(tokenIn, amountIn);
    }
}
