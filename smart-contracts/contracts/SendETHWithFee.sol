// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SendETHWithFee {
    address payable public owner;
    uint256 public feePercentage = 30; // 0.3% fee (30 basis points)

    event Sent(address indexed from, address indexed to, uint256 amount, address token);
    event FeeUpdated(uint256 newFeePercentage);
    event Withdrawn(address indexed owner, uint256 amount);
    event TokenWithdrawn(address indexed token, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function sendFunds(address _token, address payable _to, uint256 _amount) public payable {
        require(_amount > 0, "Amount must be greater than zero");

        // Calculate fee (0.3% of amount)
        uint256 fee = (_amount * feePercentage) / 10000;
        require(_amount > fee, "Amount too small"); // Prevents sending zero after fee deduction

        uint256 sendAmount = _amount - fee; // Amount to be sent after deducting fee

        if (_token != address(0)) {
            // Sending ERC-20 token
            IERC20 token = IERC20(_token);
            
            // Transfer full amount to contract first, then transfer separately
            require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
            require(token.transfer(_to, sendAmount), "Send failed");
            require(token.transfer(owner, fee), "Fee transfer failed"); // Transfer fee to owner
        } 
        else {
            // Sending ETH
            require(msg.value >= _amount, "Not enough ETH sent");

            (bool sent, ) = _to.call{value: sendAmount}("");
            require(sent, "ETH transfer failed");

            (bool feeSent, ) = owner.call{value: fee}("");
            require(feeSent, "Fee transfer failed");
        }

        emit Sent(msg.sender, _to, sendAmount, _token);
    }

    // Owner can update the fee percentage
    function setFeePercentage(uint256 _newFeePercentage) public onlyOwner {
        require(_newFeePercentage <= 1000, "Fee too high"); // Max 10% limit for safety
        feePercentage = _newFeePercentage;
        emit FeeUpdated(_newFeePercentage);
    }

    // Owner can withdraw ETH from contract
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");

        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdrawal failed");

        emit Withdrawn(owner, balance);
    }

    // Owner can withdraw ERC-20 tokens sent to the contract
    function withdrawTokens(address _token) public onlyOwner {
        IERC20 token = IERC20(_token);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");

        require(token.transfer(owner, balance), "Token withdrawal failed");

        emit TokenWithdrawn(_token, balance);
    }

    // Allow contract to receive ETH
    receive() external payable {}
}

