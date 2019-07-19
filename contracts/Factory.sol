pragma solidity ^0.5.0;

import "./ChildContract.sol";

contract Factory {
	address public deployedAddress;

	event DeployedOnChain(address addr, uint256 salt);//contract deployed
	event GeneratedOffChain(address addr);//contract address generated before deployment on chain

	function deployContract(uint256 salt) public {
		address contractAddress;
		bytes memory contractCodeBytes = type(ChildContract).creationCode;
		assembly {
			contractAddress := create2 (
				0, // 0 w
				add(contractCodeBytes, 32),
				mload(contractCodeBytes), //size of contract byte code
				salt // any value set by developer
			)
			if iszero(extcodesize(contractAddress)) {revert(0, 0)}
		}
		deployedAddress = contractAddress;
		emit DeployedOnChain(contractAddress, salt);
	}

	function calculateContractAddress(uint256 salt) public returns (address) {
		//emit GeneratedOffChain();
	}
}
