import {message as antMessage} from "antd";
import getWeb3 from "../getWeb3";

export const getResponseErrorMessage = (err) => {
    if (err.response) {
        const message = err.response?.data.message || "An error occur";

        if (typeof message !== "string") {
            return JSON.stringify(message);
        } else {
            return message;
        }
    }
    return err.message || "An error occur";
};
export const showError = (err, func) => {
    const displayFunc = func ?? antMessage.error;
    displayFunc(getResponseErrorMessage(err));
};

export const getAddressFromMetaMask = (callback) => {
    console.log('gọi hàm')
    // define
    let currentAccount = "";
    const setCurrentAccount = (account) => {
        currentAccount = account;
        callback(account)
        localStorage.setItem("account", account);
        console.log('currentAccount', currentAccount);
    }
    const registerEthereumListener = () => {
        window.ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
            console.log('onAccountsChanged');
            setCurrentAccount(accounts[0]);
        });
    }

    // call
    registerEthereumListener();
    connectMetaMask().then((accounts) => {
        currentAccount = accounts[0];
        console.log('connect MetaMask successfully');
        setCurrentAccount(accounts[0]);
    }).catch((error) => {
        showError('connect MetaMask failed');
        console.log('error', error);
    });

}


const connectMetaMask = async () => {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    console.log('-----------accounts', accounts);
    return accounts;
    // check MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        return accounts;
    }
    console.log('MetaMask is not installed!!!');
    return [];
}
