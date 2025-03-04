// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CreeperPool.sol";

contract Buy is ERC20 {
    IERC20 public CEPcoin; // The token being sold (e.g., Creeper Coin)
    IERC20 public stablecoin; // The stablecoin used for buying (e.g., USDT)
    CreeperPool public creeperPool;

    uint256 public constant FEE = 30; // 0.3% fee (30 basis points)

    event CEPcoinBought(address indexed buyer, uint256 stablecoinAmount, uint256 CEPcoinAmount);
    event DebugReserves(uint256 reserveCEP, uint256 reserveStablecoin);
    event DebugCalculation(uint256 reserveCEP, uint256 reserveStablecoin, uint256 stablecoinAmountWithFee, uint256 CEPcoinAmount);

    constructor(address _CEPcoin, address _stablecoin, address _CreeperPool) ERC20("Creeper Trading Token", "CEP") {
        require(_CEPcoin != address(0) && _stablecoin != address(0) && _CreeperPool != address(0), "Invalid token address");
        CEPcoin = IERC20(_CEPcoin);
        stablecoin = IERC20(_stablecoin);
        creeperPool = CreeperPool(_CreeperPool);
    }


    // Buy tokens with stablecoin
    function buyToken(uint256 stablecoinAmount) external returns (uint256 CEPcoinAmount) {
        require(stablecoinAmount > 0, "Amount must be greater than 0");

        // Check user's stablecoin allowance
        require(stablecoin.allowance(msg.sender, address(this)) >= stablecoinAmount, 
        "Insufficient stablecoin allowance");

        uint256 reserveCEP = CEPcoin.balanceOf(address(creeperPool));
        uint256 reserveStablecoin = stablecoin.balanceOf(address(creeperPool));

        emit DebugReserves(reserveCEP, reserveStablecoin);
        // Ensure there are enough reserves
        require(reserveCEP > 0 && reserveStablecoin > 0, "Insufficient reserves in the pool");

        // Calculate amount of tokens to send (including fee)
        // Calculate fee amount
        uint256 feeAmount = (stablecoinAmount * FEE) / 10000;
        uint256 stablecoinAmountWithFee = stablecoinAmount - feeAmount; // Deduct 0.3% fee

        CEPcoinAmount = (reserveCEP * stablecoinAmountWithFee) / (reserveStablecoin  +  stablecoinAmountWithFee);


        // Emit debug event to check calculations
        emit DebugCalculation(reserveCEP, reserveStablecoin, stablecoinAmountWithFee, CEPcoinAmount);

        require(CEPcoinAmount > 0, "Insufficient token amount");

        // Check if pool has approved this contract to spend CEPcoin
        require(CEPcoin.allowance(address(creeperPool), address(this)) >= CEPcoinAmount,
        "Insufficient CEPcoin allowance from pool");


        // Check if pool has enough balance
        require(CEPcoin.balanceOf(address(creeperPool)) >= CEPcoinAmount,
        "Insufficient CEPcoin balance in pool");


        // // Transfer stablecoin from user to pool
        // bool stablecoinTransferSuccess = stablecoin.transferFrom(msg.sender, address(creeperPool), stablecoinAmount);
        // require(stablecoinTransferSuccess, "Stablecoin transfer failed");

        // // Transfer CEPcoin from pool to user
        // bool CEPcoinTransferSuccess = CEPcoin.transferFrom(address(creeperPool), msg.sender, CEPcoinAmount);
        // require(CEPcoinTransferSuccess, "CEPcoin transfer failed");

        // Transfer stablecoin from the user to the contract - add the stable coin
        stablecoin.transferFrom(msg.sender,  address(creeperPool), stablecoinAmount);

        // Transfer from pool 
        CEPcoin.transferFrom(address(creeperPool), msg.sender, CEPcoinAmount);

        emit CEPcoinBought(msg.sender, stablecoinAmount, CEPcoinAmount);
    }
}