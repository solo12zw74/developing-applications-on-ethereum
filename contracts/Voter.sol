// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voter {
  struct Option {
    uint votesCount;
    bool exists;
  }
  struct VoteResult {
    string option;
    uint counter;
  }
  string[] private options;
  uint private optionsLength;
  mapping(string => Option) private optionsMap;
  mapping(address => bool) hasVoted;
  
  constructor(string[] memory _options) {
    require(_options.length < 32);
    options = _options;

    optionsLength = 0;
    for (uint index = 0; index < _options.length; index++) {
      Option memory option = Option(0, true);
      option.exists = true;
      option.votesCount = 0;
      optionsMap[_options[index]] = option;
      optionsLength++;
    }
  }

   function vote(string memory option) public {
    require(!hasVoted[msg.sender], "Already voted");
    Option memory optionToCheck = optionsMap[option];
    require(optionToCheck.exists, "Options for vote doesn't exists");

    recordVote(option);
  }

  function recordVote(string memory option) private {
    hasVoted[msg.sender] = true;
    Option storage optionToVote = optionsMap[option];
    optionToVote.votesCount += 1;
  }

  function getOptions() public view returns (string[] memory){
    return options;
  }

  function getVotes() public view returns (VoteResult[] memory voteResult){
      voteResult = new VoteResult[](optionsLength);
      for (uint256 index = 0; index < optionsLength; index++) {
        string memory optionName = options[index];
        Option memory option = optionsMap[optionName];
        voteResult[index] = VoteResult(optionName, option.votesCount);
      }
  }
}
