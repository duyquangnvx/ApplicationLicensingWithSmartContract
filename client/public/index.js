$(document).ready(() => {
    // define
    let currentAccount = "";
    const setCurrentAccount = (account) => {
        currentAccount = account;
        console.log('currentAccount', currentAccount);
    }
    const registerEthereumListener = () => {
        ethereum.on('accountsChanged', function (accounts) {
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
        console.log('connect MetaMask failed');
        console.log('error', error);
    });

    
});

const connectMetaMask = async () => {
    // check MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        return accounts;
    }
    console.log('MetaMask is not installed!!!');   
    return []; 
}