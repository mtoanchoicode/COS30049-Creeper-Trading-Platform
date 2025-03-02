// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CreeperBuy is ERC20 {
    IERC20 public CEPcoin; // The token being sold (e.g., Creeper Coin)
    IERC20 public stablecoin; // The stablecoin used for buying (e.g., USDT)

    uint256 public reserveCEP; // Reserve of the project token
    uint256 public reserveStablecoin; // Reserve of the stablecoin

    uint256 public constant FEE = 30; // 0.3% fee (30 basis points)

    event LiquidityAdded(address indexed provider, uint256 amountCEPcoin, uint256 amountStablecoin, uint256 liquidity);
    event CEPcoinBought(address indexed buyer, uint256 stablecoinAmount, uint256 CEPcoinAmount);

    constructor(address _CEPcoin, address _stablecoin) ERC20("Creeper Trading Token", "CEP") payable{
        require(_CEPcoin != address(0) && _stablecoin != address(0), "Invalid token address");
        CEPcoin = IERC20(_CEPcoin);
        stablecoin = IERC20(_stablecoin);
    }

     // Add liquidity to the pool
    function addLiquidity(uint256 amountCEPcoin, uint256 amountStablecoin) external payable {
        require(amountCEPcoin > 0 && amountStablecoin > 0, "Amounts must be greater than 0");

        // Transfer CEPcoins from the user to the contract
        CEPcoin.transferFrom(msg.sender, address(this), amountCEPcoin);
        
        //payable(msg.sender).transfer(address(this).balance);
        stablecoin.transferFrom(msg.sender, address(this), amountStablecoin);

        // Calculate liquidity tokens to mint
        uint256 liquidity;
        if (totalSupply() == 0) {
            liquidity = sqrt(amountCEPcoin * amountStablecoin); // Initial liquidity
        } else {
            liquidity = min((amountCEPcoin * totalSupply()) / reserveCEP, (amountStablecoin * totalSupply()) / reserveStablecoin);
        }

        require(liquidity > 0, "Insufficient liquidity minted");

        // Update reserves
        reserveCEP += amountCEPcoin;
        reserveStablecoin += amountStablecoin;

        // Mint LP CEPcoins to the provider
        _mint(msg.sender, liquidity);

        emit LiquidityAdded(msg.sender, amountCEPcoin, amountStablecoin, liquidity);
    }

        // Remove liquidity from the pool
    function removeLiquidity(uint256 liquidity) external {
        require(liquidity > 0, "Liquidity must be greater than 0");

        // Calculate amounts to return
        uint256 amountCEPcoin = (liquidity * reserveCEP) / totalSupply();
        uint256 amountStablecoin = (liquidity * reserveStablecoin) / totalSupply();

        // Burn LP tokens
        _burn(msg.sender, liquidity);

        // Transfer tokens to the provider
        CEPcoin.transfer(msg.sender, amountCEPcoin);
        stablecoin.transfer(msg.sender, amountStablecoin);

        // Update reserves
        reserveCEP = CEPcoin.balanceOf(address(this));
        reserveStablecoin = stablecoin.balanceOf(address(this));
    }

    // Buy tokens with stablecoin
    function buyToken(uint256 stablecoinAmount) external returns (uint256 CEPcoinAmount) {
        require(stablecoinAmount > 0, "Amount must be greater than 0");


        // Calculate amount of tokens to send (including fee)
        uint256 stablecoinAmountWithFee = stablecoinAmount * (10000 - FEE); // Deduct 0.3% fee
        CEPcoinAmount = (reserveCEP * stablecoinAmountWithFee) / (reserveStablecoin * 10000 + stablecoinAmountWithFee);

        require(CEPcoinAmount > 0, "Insufficient token amount");

        // Transfer stablecoin from the user to the contract - add the stable coin
        stablecoin.transferFrom(msg.sender, address(this), stablecoinAmount);

        // Transfer tokens to the user
        CEPcoin.transfer(msg.sender, CEPcoinAmount);

        // Update reserves
        reserveCEP = CEPcoin.balanceOf(address(this));
        reserveStablecoin = stablecoin.balanceOf(address(this));

        emit CEPcoinBought(msg.sender, stablecoinAmount, CEPcoinAmount);
    }


    // Helper function to calculate square root
    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    // Helper function to calculate minimum
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}