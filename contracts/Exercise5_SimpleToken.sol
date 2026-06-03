// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise5_SimpleToken {
    string public name = 'TP3 Token';
    string public symbol = 'TP3';
    uint8 public decimals = 18;
    uint256 public totalSupply;
    address public owner;

    mapping(address => uint256) private balances;

    event Mint(address indexed account, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, 'Non authorise');
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function mint(address account, uint256 amount) external onlyOwner {
        require(account != address(0), 'Adresse invalide');
        balances[account] += amount;
        totalSupply += amount;
        emit Mint(account, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
