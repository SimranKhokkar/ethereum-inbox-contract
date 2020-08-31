const jsonfile = require('jsonfile');
const path = require('path');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contractPath = path.join(__dirname, 'contractAddress.json');
const source = jsonfile.readFileSync(contractPath);
const allContract = source['Inbox'];
const myContract = web3.eth.contract(allContract.abi).at(allContract.address);

// myContract.inboxMessage('hey', {from: "0x15ccc38776d61c6d5a3ebf2237a70af5b070d52c" },(err, message) => {
//     console.log('message:', message);
// });

myContract.setMessage('hello', {from: "0x15ccc38776d61c6d5a3ebf2237a70af5b070d52c"},(err, transactionId) => {
    if(err){
        console.log('ERROR', err);
        return;
    }
    console.log('transaction id:', transactionId);
    return transactionId;
});

const message = myContract.message.call();
console.log(message);