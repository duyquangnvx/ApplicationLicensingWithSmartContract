import React, {useEffect} from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PurchasePage from "./pages/purchase/PurchasePage";
import HomePage from "./pages/home/HomePage";

function App() {
    // const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    // const ethereum = web3.eth;

    useEffect(() => {
        // define
        let currentAccount = "";
        const setCurrentAccount = (account) => {
            currentAccount = account;
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
            console.log('connect MetaMask failed');
            console.log('error', error);
        });


    }, [])


    const connectMetaMask = async () => {
        // check MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            return accounts;
        }
        console.log('MetaMask is not installed!!!');
        return [];
    }
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/purchase" element={<PurchasePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
