
const assert = require('assert');
const ethJsUtil = require('ethereumjs-util');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
	'slender blossom quarter estate slot uncle eyebrow tank clarify forest notice scorpion',
	'http://127.0.0.1:8545',
);

const web3 = new Web3(provider);


const { abi:factoryAbi, bytecode:factoryBytecode } = require('../build/contracts/Factory.json');

async function deployFactoryContract() {
	const Factory = new web3.eth.Contract(factoryAbi)
	const {_address: factoryContractAddress} = await Factory.deploy(
			{
				data: factoryBytecode
			}
		)
	.send({
	    from: '0x73718639c035d5d1ae11fd9936719585d801f762',
	    gas: 2500000,
	    gasPrice: 10000000000
	})
	.then((newInstance) => {
	    console.log("Mined at: " + newInstance.options.address);
	})
	console.log("Mined at: " + factoryContractAddress);
	return factoryContractAddress;
} 

async function deployChildContractWithFactory(salt, factoryAddress) {
  const Factory = new web3.eth.Contract(factoryAbi, factoryAddress)
  const result = await Factory.methods.deployContract(salt).send({
    from: '0x73718639c035d5d1ae11fd9936719585d801f762',
    gas: 4500000,
    gasPrice: 10000000000
  })
  const address = result.events.DeployedOnChain.returnValues.addr.toLowerCase();
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
			bytecode
		)
	);
}


module.exports = {
  web3,
  deployFactoryContract,
  deployChildContractWithFactory,
  generateAddress
}