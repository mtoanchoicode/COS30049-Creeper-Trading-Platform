// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenFaucet {
    address public owner;
    mapping(address => uint256) public lastClaim;
    uint256 public claimInterval = 24 hours;
    uint256 public amount = 100 * 10**18; // Adjust based on token decimals

    IERC20 public LNX;
    IERC20 public CEP;

    event FaucetClaimed(address indexed user, address token, uint256 amount);
    event OwnerWithdrawal(address indexed owner, address token, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address _lnx, address _cep) {
        owner = msg.sender;
        LNX = IERC20(_lnx);
        CEP = IERC20(_cep);
    }

    function claim(address token) external {
        require(token == address(LNX) || token == address(CEP), "Invalid token");
        require(block.timestamp >= lastClaim[msg.sender] + claimInterval, "Wait 24 hours");

        lastClaim[msg.sender] = block.timestamp;

        uint256 contractBalance = IERC20(token).balanceOf(address(this));
        require(contractBalance >= amount, "Not enough tokens in faucet");

        require(IERC20(token).transfer(msg.sender, amount), "Token transfer failed");
        emit FaucetClaimed(msg.sender, token, amount);
    }

    function setAmount(uint256 _amount) external onlyOwner {
        amount = _amount;
    }

    function setClaimInterval(uint256 _interval) external onlyOwner {
        claimInterval = _interval;
    }

    function withdrawTokens(address token, uint256 _amount) external onlyOwner {
        uint256 contractBalance = IERC20(token).balanceOf(address(this));
        require(_amount <= contractBalance, "Insufficient contract balance");

        require(IERC20(token).transfer(owner, _amount), "Token withdrawal failed");
        emit OwnerWithdrawal(owner, token, _amount);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;
    }
}