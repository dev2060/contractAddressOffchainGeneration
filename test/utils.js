
const assert = require('assert');
const ethJsUtil = require('ethereumjs-util');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const web3_options = {
	defaultBlock: "latest",
	transactionConfirmationBlocks: 1,
	transactionBlockTimeout: 5
};

const provider = new HDWalletProvider(
	'round execute level typical rally grab airport meat illegal actor invite saddle',
	'http://127.0.0.1:8545',
);

const web3 = new Web3(provider, null, web3_options);


const { abi:factoryAbi, bytecode:factoryBytecode } = require('../build/contracts/Factory.json');

async function deployFactoryContract() {
	const FactoryContract = new web3.eth.Contract(factoryAbi);
	const result = await FactoryContract
	.deploy({
		data: factoryBytecode
	})
	.send({
	    from: '0x70edb8c53938b4f3113912b8b42aa83722159922',
	    gas: 2500000,
	    gasPrice: 10000000000
	});
	console.log("Mined at: " + result.options.address);
	return result.options.address;
} 

async function deployChildContractWithFactory(salt, factoryAddress) {
  const Factory = new web3.eth.Contract(factoryAbi, factoryAddress)
  const result = await Factory.methods.deployContract(salt).send({
    from: '0x70edb8c53938b4f3113912b8b42aa83722159922',
    gas: 4500000,
    gasPrice: 10000000000
  })
  const address = result.events.DeployedOnChain.returnValues.addr.toLowerCase();
  //console.log(result);
  return address;
}

function numToUint256(value) {
	return ethJsUtil.bufferToHex(ethJsUtil.setLengthLeft(value, 32));
}

function generateAddress(factoryAddress, salt, byteCode) {
	var saltHex = numToUint256(salt);
	return ethJsUtil.bufferToHex(
		ethJsUtil.generateAddress2(
			factoryAddress,
			saltHex,
			byteCode
		)
	);
}


module.exports = {
  web3,
  deployFactoryContract,
  deployChildContractWithFactory,
  generateAddress
}