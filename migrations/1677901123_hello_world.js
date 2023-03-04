var HelloWorld = require("./HelloWorld.sol");

module.exports = function(_deployer) {
  _deployer.deploy(HelloWorld);
};
