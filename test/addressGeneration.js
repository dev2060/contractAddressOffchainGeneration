

const {
  web3,
  deployFactoryContract,
  deployChildContractWithFactory,
  generateAddress,
} = require('./utils.js')

const assert = require('assert')

const { bytecode:childContractByteCode } = require('../build/contracts/ChildContract.json')

async function start() {
	const factoryAddress1 = await deployFactoryContract();
	const salt11_ = 11;
	const addressOffChain = generateAddress(factoryAddress1, salt11_, childContractByteCode);
	
	console.log("address generated offchain: " + addressOffChain);
	const addressOnChain = await deployChildContractWithFactory(salt11_, factoryAddress1);
	
	console.log("address generated onchain: " + addressOnChain);
	assert.equal(addressOffChain, addressOnChain, "addresses do not match");

	console.log("working");
}

start()