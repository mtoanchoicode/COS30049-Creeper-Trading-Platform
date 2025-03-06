// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenPool {
    IERC20 public cepToken;
    IERC20 public lnxToken;
    address public owner;

    constructor(address _cepToken, address _lnxToken) {
        cepToken = IERC20(_cepToken);
        lnxToken = IERC20(_lnxToken);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    function depositTokens(uint256 cepAmount, uint256 lnxAmount) external onlyOwner {
        require(cepToken.transferFrom(msg.sender, address(this), cepAmount), "Deposit CEP failed");
        require(lnxToken.transferFrom(msg.sender, address(this), lnxAmount), "Deposit LNX failed");
    }

    function withdrawTokens(uint256 cepAmount, uint256 lnxAmount) external onlyOwner {
        require(cepToken.transfer(msg.sender, cepAmount), "Withdraw CEP failed");
        require(lnxToken.transfer(msg.sender, lnxAmount), "Withdraw LNX failed");
    }

    function getReserves() external view returns (uint256 cepReserve, uint256 lnxReserve) {
        return (cepToken.balanceOf(address(this)), lnxToken.balanceOf(address(this)));
    }
}
