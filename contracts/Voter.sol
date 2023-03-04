// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voter {
  uint[] public votes;
  string[] public options;
  mapping(address => bool) hasVoted;

  constructor(string[] memory _options) {
    options = _options;
    votes = new uint[](_options.length);
  }

  function vote(uint option) public {
    require(option < options.length, "Invalid option");
    require(!hasVoted[msg.sender], "Already voted");
    recordVote(option);
  }

  function recordVote(uint option) private {
    hasVoted[msg.sender] = true;
    votes[option] += 1;
  }

  function getOptions() public view returns (string[] memory){
    return options;
  }

  function getVotes() public view returns (uint[] memory){
    return votes;
  }
}
