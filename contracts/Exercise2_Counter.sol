// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise2_Counter {
    int256 public count;

    function increment() external {
        count += 1;
    }

    function decrement() external {
        count -= 1;
    }

    function reset() external {
        count = 0;
    }
}
