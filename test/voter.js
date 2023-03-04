const Voter = artifacts.require("Voter");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Voter", function (/* accounts */) {
  it("should init options", async function () {
    var voter = await Voter.deployed();
    var options = await voter.getOptions();
    return assert.isTrue(options.length == 2);
  });
});
