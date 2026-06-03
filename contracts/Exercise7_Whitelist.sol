// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise7_Whitelist {
    address public owner;
    mapping(address => bool) public whitelist;

    event WhitelistAdded(address indexed account);
    event WhitelistRemoved(address indexed account);

    modifier onlyOwner() {
        require(msg.sender == owner, 'Non authorise');
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addAddress(address account) external onlyOwner {
        require(account != address(0), 'Adresse invalide');
        whitelist[account] = true;
        emit WhitelistAdded(account);
    }

    function removeAddress(address account) external onlyOwner {
        require(account != address(0), 'Adresse invalide');
        whitelist[account] = false;
        emit WhitelistRemoved(account);
    }

    function checkAddress(address account) external view returns (bool) {
        return whitelist[account];
    }
}
