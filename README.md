# contractAddressOffchainGeneration

### dependencies:

```bash
web3js
ganache-cli
ethereumjs-util
```

### note:

`always put such options as "transactionConfirmationsBlocks" to "1" due to unclosed bug according last messages in thread: (https://github.com/ethereum/web3.js/issues/2661) `

### how to run:

```bash
install dependencies
truffle compile
truffle migrate
node test/addressGeneration.js
```

### to do

```bash
npm
```