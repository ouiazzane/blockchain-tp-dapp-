// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise8_EventLogger {
    struct Message {
        address sender;
        string text;
        uint256 timestamp;
    }

    Message[] public messages;

    event MessageLogged(address indexed sender, string text, uint256 timestamp);

    function logMessage(string calldata text) external {
        messages.push(Message({sender: msg.sender, text: text, timestamp: block.timestamp}));
        emit MessageLogged(msg.sender, text, block.timestamp);
    }

    function messageCount() external view returns (uint256) {
        return messages.length;
    }

    function getMessage(uint256 index) external view returns (address sender, string memory text, uint256 timestamp) {
        require(index < messages.length, 'Message introuvable');
        Message storage message = messages[index];
        return (message.sender, message.text, message.timestamp);
    }
}
