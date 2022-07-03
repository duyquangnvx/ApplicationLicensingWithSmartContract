const LicenseToken = (() => {
    // todo: config connect smart contract for local network
    // const OWNER_PRIVATE_KEY = '0x31ba960364a7f7e65d13f45933e7a46a15856fca0c99a3900c1559cf634737da';
    // const CONTRACT_ADDRESS = '0x5dB1A2A405422D7CF0e787FB713FA298B5386DDf';
    // const RPC_SERVER = 'http://127.0.0.1:8545';
   
    // todo: config connect smart contract for testnet (ropsten)
    const OWNER_PRIVATE_KEY = '0x48ee5080dac117d014fdbf2dcc46990c927039a33c073d4485e168fcf549aba6';
    const CONTRACT_ADDRESS = '0xA53352BEB6120Ab0e4ed55f18a9464A36e9D24aD';
    const RPC_SERVER = 'https://ropsten.infura.io/v3/474443be41df487281ca528c38a59de5';

    // abi for create contract instance
    const ContractConfig = require('../contracts/LicenseToken.json');
    const ABI = ContractConfig.abi;

    // use web3
    const Web3 = require('web3');
    const web3 = new Web3(RPC_SERVER);

    // define contract owner account for sign transaction (address)
    web3.eth.accounts.wallet.add(OWNER_PRIVATE_KEY);
    const CONTRACT_OWNER_ACCOUNT = web3.eth.accounts.wallet[0].address;
    console.log('CONTRACT_OWNER_ACCOUNT', CONTRACT_OWNER_ACCOUNT);

    let contract;    
    let _init = false;
    return {
        METHOD_GIVE_LICENSE: "giveLicense",
        METHOD_ACTIVATE: "activate",
        METHOD_RENEWAL: "renewal",
        METHOD_IS_LICENSE_ACTIVE: "isLicenseActive",
        METHOD_HANDLE_EXPIRED_LICENSE: "handleExpiredLicense",
        METHOD_GET_TOKEN_INFO: "getTokenInfo",
        METHOD_GET_TOKENS_OF_ACCOUNT: "getAllTokensOfAccount",
        METHOD_GET_TOKENS_ID_OF_ACCOUNT: "getAllTokenIdsOfAccount",
        initContract: async () => {
            if (_init) return;
            _init = true;

            contract = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
            
            // listen event
            // const result = await contract.getPastEvents('LicenseGiven');
            // console.log("____________", result)
        },
        getContract: () => {
            return contract;
        },
        getTokenInfo: async (address, tokenId) => {
            const result = await LicenseToken.call(LicenseToken.METHOD_GET_TOKEN_INFO, address, tokenId);
            const token = {
                tokenId: tokenId,
                licenseType: result.licenseType,
                registeredOn: result.registeredOn,
                expiresOn: result.expiresOn,
                licenseState: result.state,
                deviceId: result.deviceId
            }
            return token;
        },
        call: async (...args) => {
            const name = args[0];  
            if (contract.methods[name]) {
                args = [].slice.call(args).splice(1);
                return await contract.methods[name](...args).call({from: CONTRACT_OWNER_ACCOUNT});
            }
            console.log(`call ${name}`, 'not found');
            return null;
        },
        send: async (...args) => {
            const name = args[0];
            if (contract.methods[name]) {
                args = [].slice.call(args).splice(1);
                const gasPrice = await web3.eth.getGasPrice();
                const gasEstimate = await contract.methods[name](...args).estimateGas({ from: CONTRACT_OWNER_ACCOUNT });
                const contractOwnerBalance = await contract.methods.balanceOf(CONTRACT_OWNER_ACCOUNT).call();
    
                const eth = await LicenseToken.getEthereumBalance(CONTRACT_OWNER_ACCOUNT);
                if (eth > gasEstimate) {
                    return await contract.methods[name](...args).send({ from: CONTRACT_OWNER_ACCOUNT, gasPrice: gasPrice, gas: gasEstimate });
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