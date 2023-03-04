// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
  uint public value;

  function setValue(uint newValue) public {
    value = newValue;
  }
}
