// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TokenPool.sol";

contract SwapETH {
    IERC20 public cepToken;
    IERC20 public lnxToken;
    TokenPool public liquidityPool;
    uint256 public constant RATE = 2; // 1 CEP = 2 LNX
    uint256 public serviceFee = 30; // 1% Fee (1/100)

    address public owner;

    constructor(address _cepToken, address _lnxToken, address _liquidityPool) {
        cepToken = IERC20(_cepToken);
        lnxToken = IERC20(_lnxToken);
        liquidityPool = TokenPool(_liquidityPool);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function setServiceFee(uint256 _fee) external onlyOwner {
        require(_fee <= 500, "Fee too high! Max: 5%");
        serviceFee = _fee;
    }

    function swapCEPForLNX(uint256 _cepAmount) external {
        uint256 lnxAmount = (_cepAmount * RATE);
        uint256 fee = (lnxAmount * serviceFee) / 1000; // Calculate fee

        require(cepToken.transferFrom(msg.sender, address(liquidityPool), _cepAmount), "CEP transfer failed");
        require(lnxToken.transferFrom(address(liquidityPool), msg.sender, lnxAmount - fee), "LNX transfer failed");
        require(lnxToken.transfer(owner, fee), "Fee transfer failed"); // Send fee to owner
    }

    function swapLNXForCEP(uint256 _lnxAmount) external {
        require(_lnxAmount % RATE == 0, "LNX amount must be multiple of RATE");
        uint256 cepAmount = _lnxAmount / RATE;
        uint256 fee = (cepAmount * serviceFee) / 1000;

        require(lnxToken.transferFrom(msg.sender, address(liquidityPool), _lnxAmount), "LNX transfer failed");
        require(cepToken.transferFrom(address(liquidityPool), msg.sender, cepAmount - fee), "CEP transfer failed");
        require(cepToken.transfer(owner, fee), "Fee transfer failed"); // Send fee to owner
    }
}
