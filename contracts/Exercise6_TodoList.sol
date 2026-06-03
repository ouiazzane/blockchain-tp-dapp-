// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise6_TodoList {
    struct Task {
        string description;
        bool completed;
    }

    Task[] public tasks;

    event TaskCreated(uint256 taskId, string description);
    event TaskCompleted(uint256 taskId, bool completed);

    function addTask(string calldata description) external {
        tasks.push(Task({description: description, completed: false}));
        emit TaskCreated(tasks.length - 1, description);
    }

    function toggleTask(uint256 taskId) external {
        require(taskId < tasks.length, 'Tache introuvable');
        tasks[taskId].completed = !tasks[taskId].completed;
        emit TaskCompleted(taskId, tasks[taskId].completed);
    }

    function getTask(uint256 taskId) external view returns (string memory description, bool completed) {
        require(taskId < tasks.length, 'Tache introuvable');
        Task storage task = tasks[taskId];
        return (task.description, task.completed);
    }

    function taskCount() external view returns (uint256) {
        return tasks.length;
    }
}
