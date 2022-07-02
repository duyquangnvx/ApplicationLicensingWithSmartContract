

// const LicenseToken = (() => {
//     // 
//     // const CONTRACT_ADDRESS = '0x8F4289254A3f5cD6EA9a040Cc4Fe0F87E78D52de';
//     // const RPC_SERVER = 'https://ropsten.infura.io/v3/474443be41df487281ca528c38a59de5';
//     // const OWNER_PRIVATE_KEY = 'cfad5e35f636d2d32e4630453ff526dcec9b0afd30a526d3ef5dbb54e6d2850c';
//     const CONTRACT_ADDRESS = '0x031Fbbb1c00aa6aeE7c153AB772eE0C7A678be4a';
//     const RPC_SERVER = 'http://127.0.0.1:8545';
//     const OWNER_PRIVATE_KEY = '31ba960364a7f7e65d13f45933e7a46a15856fca0c99a3900c1559cf634737da';
//     //'ad8fe261200313a292a46c23b53a4454c7c498ed5a5a750aaada78c251df2136';
    
    
//     const ContractConfig = require('../contracts/LicenseToken.json');
//     const ABI = ContractConfig.abi;
    
//     const Web3 = require('web3');
//     const web3 = new Web3(RPC_SERVER);


//     web3.eth.accounts.wallet.add(OWNER_PRIVATE_KEY);
//     const CONTRACT_OWNER_ACCOUNT = web3.eth.accounts.wallet[0].address;
//     //
//     let contract;    
//     let _init = false;

//     return {
//         METHOD_GIVE_LICENSE: "giveLicense",
//         METHOD_ACTIVATE: "activate",
//         METHOD_RENEWAL: "renewal",
//         METHOD_IS_LICENSE_ACTIVE: "isLicenseActive",
//         METHOD_HANDLE_EXPIRED_LICENSE: "handleExpiredLicense",
//         METHOD_GET_TOKEN_INFO: "getTokenInfo",
//         METHOD_GET_TOKENS_OF_ACCOUNT: "getAllTokensOfAccount",
//         METHOD_GET_TOKENS_ID_OF_ACCOUNT: "getAllTokenIdsOfAccount",
//         initContract: async () => {
//             if (_init) return;
//             _init = true;

//             contract = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
//             // listen event
//             // const result = await contract.getPastEvents('LicenseGiven');
//             // console.log("____________", result)
//         },
//         getContract: () => {
//             return contract;
//         },
//         getTokenInfo: async (address, tokenId) => {
//             const result = await LicenseToken.call(LicenseToken.METHOD_GET_TOKEN_INFO, address, tokenId);
//             const token = {
//                 tokenId: tokenId,
//                 licenseType: result.licenseType,
//                 registeredOn: result.registeredOn,
//                 expiresOn: result.expiresOn,
//                 licenseState: result.state,
//                 deviceId: result.deviceId
//             }
//             return token;
//         },
//         call: async (...args) => {
//             const name = args[0];  
//             if (contract.methods[name]) {
//                 args = [].slice.call(args).splice(1);
//                 return await contract.methods[name](...args).call({from: CONTRACT_OWNER_ACCOUNT});
//             }
//             console.log(`call ${name}`, 'not found');
//             return null;
//         },
//         send: async (...args) => { 
//             const name = args[0];
//             if (contract.methods[name]) {
//                 args = [].slice.call(args).splice(1);
//                 const gasPrice = await web3.eth.getGasPrice();
//                 const gasEstimate = await contract.methods[name](...args).estimateGas({ from: CONTRACT_OWNER_ACCOUNT });
//                 console.log(`send ${name} gasPrice: ${gasPrice} gasEstimate: ${gasEstimate}`);
//                 return await contract.methods[name](...args).send({ from: CONTRACT_OWNER_ACCOUNT, gasPrice: gasPrice, gas: gasEstimate });
//             }
//             console.log(`send ${name}`, 'not found');
//             return null;
//         },
//         getEthereumBalance: async (address) => {
//             return await web3.eth.getBalance(address);
//         },
//     }
// })();

// module.exports = LicenseToken;

const LicenseToken = (() => {
    const OWNER_PRIVATE_KEY = '31ba960364a7f7e65d13f45933e7a46a15856fca0c99a3900c1559cf634737da';
    const CONTRACT_ADDRESS = '0x031Fbbb1c00aa6aeE7c153AB772eE0C7A678be4a';
    const RPC_SERVER = 'http://127.0.0.1:8545';
    // const OWNER_PRIVATE_KEY = 'cfad5e35f636d2d32e4630453ff526dcec9b0afd30a526d3ef5dbb54e6d2850c';
    // const CONTRACT_ADDRESS = '0xE0C93B91CD3cab5De6dB45F585Addee0B11737dD';
    // const RPC_SERVER = 'https://rinkeby.infura.io/v3/50d744932aeb4275a475b15b64f7be1f';
    
    const JsonConfig = require('../contracts/LicenseToken.json');
    const ABI = JsonConfig.abi;
    const Web3 = require('web3');
    const web3 = new Web3(RPC_SERVER);

    web3.eth.accounts.wallet.add(OWNER_PRIVATE_KEY);
    const CONTRACT_OWNER_ACCOUNT = web3.eth.accounts.wallet[0].address;
    //
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