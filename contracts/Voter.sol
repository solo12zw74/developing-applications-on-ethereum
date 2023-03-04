// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voter {
  uint[] public votes;
  string[] public options;

  constructor(string[] memory _options) {
    options = _options;
    votes = new uint[](_options.length);
  }

  function vote(uint option) public {
    require(option < options.length, "Invalid option");
    votes[option] += 1;
  }

  function getOptions() public view returns (string[] memory){
    return options;
  }

  function getVotes() public view returns (uint[] memory){
    return votes;
  }
}
