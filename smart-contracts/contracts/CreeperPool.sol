// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CreeperPool is ERC20 {
    IERC20 public CEPcoin;
    IERC20 public stablecoin;
    address public owner;
    uint256 public reserveCEP;
    uint256 public reserveStablecoin;

    event LiquidityAdded(address indexed provider, uint256 amountCEPcoin, uint256 amountStablecoin, uint256 liquidity);
    event LiquidityRemoved(address indexed provider, uint256 amountCEPcoin, uint256 amountStablecoin, uint256 liquidity);

    constructor(address _CEPcoin, address _stablecoin) ERC20("Creeper-LNX Token", "CEP-LNX") {
        CEPcoin = IERC20(_CEPcoin);
        stablecoin = IERC20(_stablecoin);
        owner = msg.sender;
    }

    function addLiquidity(uint256 amountCEPcoin, uint256 amountStablecoin) external {
        require(amountCEPcoin > 0 && amountStablecoin > 0, "Amounts must be greater than 0");

        CEPcoin.transferFrom(msg.sender, address(this), amountCEPcoin);
        stablecoin.transferFrom(msg.sender, address(this), amountStablecoin);

        uint256 liquidity;
        if (totalSupply() == 0) {
            liquidity = sqrt(amountCEPcoin * amountStablecoin);
        } else {
            liquidity = min((amountCEPcoin * totalSupply()) / reserveCEP, (amountStablecoin * totalSupply()) / reserveStablecoin);
        }

        require(liquidity > 0, "Insufficient liquidity minted");
        _mint(msg.sender, liquidity);

        reserveCEP += amountCEPcoin;
        reserveStablecoin += amountStablecoin;

        emit LiquidityAdded(msg.sender, amountCEPcoin, amountStablecoin, liquidity);
    }

    function removeLiquidity(uint256 liquidity) external {
        require(liquidity > 0, "Liquidity must be greater than 0");

        uint256 amountCEPcoin = (liquidity * reserveCEP) / totalSupply();
        uint256 amountStablecoin = (liquidity * reserveStablecoin) / totalSupply();

        _burn(msg.sender, liquidity);

        CEPcoin.transfer(msg.sender, amountCEPcoin);
        stablecoin.transfer(msg.sender, amountStablecoin);

        reserveCEP = CEPcoin.balanceOf(address(this));
        reserveStablecoin = stablecoin.balanceOf(address(this));

        emit LiquidityRemoved(msg.sender, amountCEPcoin, amountStablecoin, liquidity);
    }

    function approveBuyContract(address buyContract) external {
        require(msg.sender == owner, "Only owner can approve");
        CEPcoin.approve(buyContract, type(uint256).max);
    }

    function getReserves() external view returns (uint256, uint256) {
        return (reserveCEP, reserveStablecoin);
    }

    function updateReserves() public {
        reserveCEP = CEPcoin.balanceOf(address(this));
        reserveStablecoin = stablecoin.balanceOf(address(this));
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }

    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}
