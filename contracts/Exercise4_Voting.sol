// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise4_Voting {
    struct Proposal {
        string description;
        uint256 voteCount;
    }

    Proposal[] public proposals;
    mapping(address => mapping(uint256 => bool)) public votes;

    event ProposalCreated(uint256 index, string description);
    event VoteCast(address indexed voter, uint256 proposalIndex);

    function createProposal(string calldata description) external {
        proposals.push(Proposal({description: description, voteCount: 0}));
        emit ProposalCreated(proposals.length - 1, description);
    }

    function vote(uint256 index) external {
        require(index < proposals.length, 'Proposition introuvable');
        require(!votes[msg.sender][index], 'Vous avez deja vote');
        votes[msg.sender][index] = true;
        proposals[index].voteCount += 1;
        emit VoteCast(msg.sender, index);
    }

    function getProposal(uint256 index) external view returns (string memory description, uint256 voteCount) {
        require(index < proposals.length, 'Proposition introuvable');
        Proposal storage proposal = proposals[index];
        return (proposal.description, proposal.voteCount);
    }

    function proposalCount() external view returns (uint256) {
        return proposals.length;
    }
}
