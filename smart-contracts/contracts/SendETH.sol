// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SendETH {
    event Sent(address from, address to, uint amount);

    function sendETH(address payable _to) public payable {
        require(msg.value > 0, "Send some ETH");
        _to.transfer(msg.value);
        emit Sent(msg.sender, _to, msg.value);
    }
}
