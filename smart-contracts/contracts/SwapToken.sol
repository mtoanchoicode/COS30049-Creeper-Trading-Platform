// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SwapToken {
    IERC20 public immutable tokenLNX;
    IERC20 public immutable tokenCEP;
    uint256 public feePercentage; // 0.3% fee (30 = 0.3%)
    uint256 public rate; // 1 CEP = 2 LNX (scaled to 1e18 for precision)

    address public owner;

    event Swapped(address indexed user, address fromToken, uint256 amountIn, address toToken, uint256 amountOut);
    event LiquidityDeposited(address indexed user, address token, uint256 amount);
    event LiquidityWithdrawn(address indexed owner, address token, uint256 amount);
    event FeesWithdrawn(address indexed owner, uint256 amount);
    event FeeUpdated(uint256 newFeePercentage);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor(address _tokenLNX, address _tokenCEP) {
        tokenLNX = IERC20(_tokenLNX);
        tokenCEP = IERC20(_tokenCEP);
        rate = 2e18; // Scale to 1e18 (1 CEP = 2 LNX)
        feePercentage = 30; // 0.3% fee
        owner = msg.sender;
    }

    function swap(address fromToken, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(fromToken == address(tokenLNX) || fromToken == address(tokenCEP), "Invalid token");

        bool isCEPtoLNX = fromToken == address(tokenCEP);
        IERC20 from = isCEPtoLNX ? tokenCEP : tokenLNX;
        IERC20 to = isCEPtoLNX ? tokenLNX : tokenCEP;

        require(from.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");

        // Calculate fee (0.3%)
        uint256 fee = (amount * feePercentage) / 10000;
        uint256 amountAfterFee = amount - fee;

        // Convert amounts based on rate (adjusted for 18 decimals)
        uint256 swapAmount = isCEPtoLNX
            ? (amountAfterFee * rate) // CEP → LNX
            : (amountAfterFee / rate); // LNX → CEP

        require(swapAmount > 0, "Swap amount too small");
        require(to.balanceOf(address(this)) >= swapAmount, "Not enough liquidity");

        // Transfer tokens
        require(from.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        require(to.transfer(msg.sender, swapAmount), "Swap failed");

        emit Swapped(msg.sender, fromToken, amount, address(to), swapAmount);
    }

    function depositLiquidity(address _token, uint256 _amount) external {
        require(_token == address(tokenLNX) || _token == address(tokenCEP), "Invalid token");
        require(_amount > 0, "Amount must be greater than zero");

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        emit LiquidityDeposited(msg.sender, _token, _amount);
    }

    function withdrawLiquidity(address _token, uint256 _amount) external onlyOwner {
        require(_token == address(tokenLNX) || _token == address(tokenCEP), "Invalid token");
        require(_amount > 0, "Amount must be greater than zero");

        IERC20(_token).transfer(owner, _amount);
        emit LiquidityWithdrawn(owner, _token, _amount);
    }

    function withdrawFees(address _token) external onlyOwner {
        require(_token == address(tokenLNX) || _token == address(tokenCEP), "Invalid token");
        
        uint256 feeBalance = IERC20(_token).balanceOf(address(this));
        require(feeBalance > 0, "No fees to withdraw");

        IERC20(_token).transfer(owner, feeBalance);
        emit FeesWithdrawn(owner, feeBalance);
    }

    function setFeePercentage(uint256 _newFeePercentage) external onlyOwner {
        require(_newFeePercentage <= 1000, "Fee too high"); // Max 10% limit for safety
        feePercentage = _newFeePercentage;
        emit FeeUpdated(_newFeePercentage);
    }

    function getPoolBalance(address _token) external view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }
}
