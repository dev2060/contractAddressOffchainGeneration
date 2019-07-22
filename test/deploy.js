const Factory = artifacts.require("Factory");
const {
	generateAddress
} = require('./utils.js');
const { bytecode:childContractByteCode } = require('../build/contracts/ChildContract.json')

contract('FactoryContract', function(accounts) {
	var salt11 = 11;
	var addressOffChain;
	it("child contract address should be equal to offchain contract address", function() {
		return Factory.deployed().then(function(instance) {
			addressOffChain = generateAddress(instance.address, salt11, childContractByteCode).toLowerCase();
			return instance.deployContract.sendTransaction(salt11, {from: accounts[0]});
		}).then(function(result){
			assert.equal(addressOffChain, result.receipt.logs[0].args.addr.toLowerCase(), "results do not match");
		});
	});
});