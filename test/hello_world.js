const HelloWorld = artifacts.require("HelloWorld");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("HelloWorld", function (/* accounts */) {
  it("should return correct value", async function () {
    let c = await HelloWorld.deployed();
    let expectedValue = 11;
    await c.setValue(expectedValue);
    var actual = await c.value();
    return assert.isTrue(actual == expectedValue);
  });
});
