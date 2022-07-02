import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {checkLicenseIsActive} from "../../services/api";
import {showError} from "../../util/utils";

const HomePage = ({}) => {
    const navigate = useNavigate()

    const [license, setLicense] = useState({})
// const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    // const ethereum = web3.eth;
    const tokenId = localStorage.getItem("tokenId");
    const deviceId = "some_device_id";
    const [address, setAddress] = useState('');

    useEffect(() => {
        // define
        let currentAccount = "";
        const setCurrentAccount = (account) => {
            currentAccount = account;
            setAddress(account)
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

    useEffect(() => {
        // check license with account
        if (address && tokenId) {
            checkLicenseIsActive({tokenId, address}).then(result => {
                alert("license is activated")
            }).catch(err => showError(err));
        } else {
            navigate('/purchase')
        }
    }, [address, tokenId])

    return (
        <div>
            <h1>HomePage works</h1>
        </div>
    )
}

export default HomePage;
