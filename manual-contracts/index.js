const fs = require('fs')
const Web3 = require('web3')

require('dotenv').config()

// Read smart contracts data
const bytes = fs.readFileSync('./Voter_sol_Voter.bin', 'utf8')
const abiString = fs.readFileSync('./Voter_sol_Voter.abi', 'utf8')

const abi = JSON.parse(abiString)

// Create web3 instance
const web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider(process.env.RPC_URL))

// Add account in our code
const account = web3.eth.accounts.privateKeyToAccount(process.env.ACCOUNT_PRIVATE_KEY)
web3.eth.accounts.wallet.add(account)

//Goingg to deploy the contract manually form the JS code
const voterContract = new web3.eth.Contract(abi);

console.log('Starting deploy contract')
voterContract.deploy({
    data: '0x' + bytes,
    arguments: [['tea','coffee']]
})
.send({
    from: account.address,
    gas: 1500000
})
.on('transactionHash', function(transactionHash){console.log(`Transaction hash: ${transactionHash}`)})
.on('confirmation', function(confirmationNumber, receipt){
    console.log(`Confirmation number: ${confirmationNumber}`)
    console.log(`Block number: ${receipt.blockNumber}`)
    console.log(`Block hash: ${receipt.blockHash}`)
})
.then(function(contractInstance){
    console.log(`Contract address: ${contractInstance.options.address}`)
})
.catch(function(error){
    console.error(error)
})