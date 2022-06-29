const LicenseToken = (() => {
    const OWNER_PRIVATE_KEY = '31ba960364a7f7e65d13f45933e7a46a15856fca0c99a3900c1559cf634737da';
    const ABI = require('./abi.json');
    const CONTRACT_ADDRESS = '0x89f9e5Ab6210217eAD56C95f0512F95Fd361409D';
    const RPC_SERVER = 'http://127.0.0.1:8545';

    const Web3 = require('web3');
    const web3 = new Web3(RPC_SERVER);
    web3.eth.accounts.wallet.add(OWNER_PRIVATE_KEY);
    let contractOwnerAccount = web3.eth.accounts.wallet[0].address;
    console.log('contractOwnerAccount', contractOwnerAccount);
    let contract;    
    let _init = false;

    return {
        initContract: async () => {
            if (_init) return;
            _init = true;

            contract = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
            contract.events.LicenseGiven().on('data', event => console.log(event));
            // contract.getPastEvents('LicenseGiven', {})
        },
        call: async (...args) => {
            const name = args[0];  
            if (contract.methods[name]) {
                args = [].slice.call(args).splice(1);
                return await contract.methods[name](...args).call();
            }
            console.log(`call ${name}`, 'not found');
            return null;
        },
        send: async (...args) => {
            const name = args[0];
            if (contract.methods[name]) {
                args = [].slice.call(args).splice(1);
                const gasPrice = await web3.eth.getGasPrice();
                const gasEstimate = await contract.methods[name](...args).estimateGas({ from: contractOwnerAccount });
                const contractOwnerBalance = await contract.methods.balanceOf(contractOwnerAccount).call();
    
                const eth = await LicenseToken.getEthereumBalance(contractOwnerAccount);
                if (eth > gasEstimate) {
                    return await contract.methods[name](...args).send({ from: contractOwnerAccount, gasPrice: gasPrice, gas: gasEstimate });
                }              
                console.log(`send ${name}`, `not enough balance | contractOwnerBalance: ${contractOwnerBalance}, gasEstimate: ${gasEstimate}`)
            }
            console.log(`send ${name}`, 'not found');
            return null;
        },
        getEthereumBalance: async (address) => {
            return await web3.eth.getBalance(address);
        },
    }
})();

module.exports = LicenseToken;