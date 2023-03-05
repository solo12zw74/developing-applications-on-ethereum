const fs = require('fs')
const Web3 = require('web3')

require('dotenv').config()

// Read smart contract ABI
const abiString = fs.readFileSync('./Voter_sol_Voter.abi', 'utf8')
const abi = JSON.parse(abiString)

// Create web3 instance
const web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider(process.env.RPC_URL))

// Add account in our code
const account = web3.eth.accounts.privateKeyToAccount(process.env.ACCOUNT_PRIVATE_KEY)
web3.eth.accounts.wallet.add(account)

// Going to connect to deployed smart contract by its address
const voterContract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS)

sendTransaction()
.then(function(){
    console.log('Done')
})
.catch(function(err){
    console.error(err)
})


async function sendTransaction() {
    console.log('Estimaing gas')
    const estimatedGas = await web3.eth.estimateGas({
        from: account.address,
        to: process.env.CONTRACT_ADDRESS,
        data: voterContract.methods['vote(string)']('tea').encodeABI()
    })
    console.log(`Gas estiamte: ${estimatedGas}`)

    console.log('Voting')
    await voterContract
        .methods['vote(string)']('tea')
        .send({
            from: account.address, gas: estimatedGas
        })
    
    console.log('Getting votes')
    const votes = await voterContract.methods.getVotes().call({from: account.address})
    console.log(`Votes: ${votes}`)
}
