var Voter = artifacts.require("./Voter.sol");

module.exports = function(_deployer) {
  _deployer.deploy(Voter, ["coffee","tea"]);
};
