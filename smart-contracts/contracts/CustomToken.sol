// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    address public owner;

    constructor(string memory name, string memory symbol, uint256 initialSupply, address creator) ERC20(name, symbol) {
        _mint(creator, initialSupply * 10 ** decimals());
        owner = creator;
    }
}

contract TokenFactory {
    address public owner;
    uint256 public tokenCreationFee; // Fee for creating a token

    event TokenCreated(address indexed tokenAddress, string name, string symbol, uint256 supply, address creator);
    event FeeUpdated(uint256 newFee);

    constructor(uint256 initialFee) {
        owner = msg.sender; // Set the contract deployer as the owner
        tokenCreationFee = initialFee; // Set the initial fee
    }

    // Function to create a new token
    function createToken(string memory name, string memory symbol, uint256 supply) public payable {
        require(msg.value == tokenCreationFee, "Incorrect fee sent"); // Ensure correct fee is paid
        CustomToken newToken = new CustomToken(name, symbol, supply, msg.sender);
        emit TokenCreated(address(newToken), name, symbol, supply, msg.sender);
        // Send fee to the owner
        payable(owner).transfer(msg.value);
    }

    // Function for owner to update the token creation fee
    function updateFee(uint256 newFee) public {
        require(msg.sender == owner, "Only owner can update the fee");
        tokenCreationFee = newFee;
        emit FeeUpdated(newFee);
    }

    // Function for owner to withdraw stuck ETH
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Function to check contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}