var HelloWorld = artifacts.require("./HelloWorld.sol");

module.exports = function(_deployer) {
  _deployer.deploy(HelloWorld);
};
