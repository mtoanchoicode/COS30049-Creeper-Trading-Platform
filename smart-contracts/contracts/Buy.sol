// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CreeperPool.sol";

contract CreeperBuy is ERC20 {
    IERC20 public CEPcoin; // The token being sold (e.g., Creeper Coin)
    IERC20 public stablecoin; // The stablecoin used for buying (e.g., USDT)
    CreeperPool public creeperPool;

    uint256 public constant FEE = 30; // 0.3% fee (30 basis points)

    event CEPcoinBought(address indexed buyer, uint256 stablecoinAmount, uint256 CEPcoinAmount);

    constructor(address _CEPcoin, address _stablecoin, address _CreeperPool) ERC20("Creeper Trading Token", "CEP") payable{
        require(_CEPcoin != address(0) && _stablecoin != address(0), "Invalid token address");
        CEPcoin = IERC20(_CEPcoin);
        stablecoin = IERC20(_stablecoin);
        creeperPool = CreeperPool(_CreeperPool);
    }


    // Buy tokens with stablecoin
    function buyToken(uint256 stablecoinAmount) external returns (uint256 CEPcoinAmount) {
        require(stablecoinAmount > 0, "Amount must be greater than 0");

        uint256 reserveCEP = CEPcoin.balanceOf(address(creeperPool));
        uint256 reserveStablecoin = stablecoin.balanceOf(address(creeperPool));

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
}