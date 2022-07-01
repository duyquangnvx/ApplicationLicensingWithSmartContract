const LicenseToken = (() => {
    const OWNER_PRIVATE_KEY = '31ba960364a7f7e65d13f45933e7a46a15856fca0c99a3900c1559cf634737da';
    const ABI = require('./abi.json');
    const CONTRACT_ADDRESS = '0x04BB3533a461b1259EE6575abBdDc7f9ac0E41A1';
    const RPC_SERVER = 'http://127.0.0.1:8545';

    const Web3 = require('web3');
    const web3 = new Web3(RPC_SERVER);
    web3.eth.accounts.wallet.add(OWNER_PRIVATE_KEY);
    let contractOwnerAccount = web3.eth.accounts.wallet[0].address;
    console.log('contractOwnerAccount', contractOwnerAccount);
    let contract;    
    let _init = false;

    return {
        LICENSE_TYPE_WINDOWS: 0,
        LICENSE_TYPE_MAC: 1,
        LICENSE_STATE_ACTIVE: 0,
        LICENSE_STATE_INACTIVE: 1,
        LICENSE_STATE_EXPIRED: 2,

        METHOD_GIVE_LICENSE: "giveLicense",
        METHOD_ACTIVATE: "activate",
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