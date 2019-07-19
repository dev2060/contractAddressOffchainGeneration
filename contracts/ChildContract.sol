pragma solidity ^0.5.0;


contract ChildContract {

  function doSomethingUseful() public pure returns (string memory) {
  	string memory someData = "return data_";
  	return someData;
  }
}
