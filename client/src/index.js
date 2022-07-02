import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const LicenseConfig = require('./license_token/license-config');
const LicenseToken = require('./license_token/license-token');

(async () => {
    await LicenseToken.initContract();
    const address = '0x94301fD24a45855996ED88Fb9460B77A30284DE2';   
    const result = await LicenseToken.send(LicenseToken.METHOD_GIVE_LICENSE, address, LicenseConfig.LICENSE_TYPE_WINDOWS);
    const tokenId = result.events.LicenseGiven.returnValues.tokenId;
    const registeredOn = result.events.LicenseGiven.returnValues.registeredOn;
    console.log('----------------', result);

    // const address = '0x25DeDdc3B3de5fd78F808F871C1A4Cbb8A28315b';   
    // const tokensOfAccount = await LicenseToken.call(LicenseToken.METHOD_GET_TOKENS_OF_ACCOUNT, address);
    // const tokenIdsOfAccount = await LicenseToken.call(LicenseToken.METHOD_GET_TOKENS_ID_OF_ACCOUNT, address);

    // const tokens = [];
    // for (let i = 0; i < tokenIdsOfAccount.length; i++) {
    //     const tokenOfAccount = tokensOfAccount[i];
    //     const tokenIdOfAccount = tokenIdsOfAccount[i];
    //     const token = {
    //         tokenId: tokenIdOfAccount,
    //         licenseType: tokenOfAccount.licenseType,
    //         registeredOn: tokenOfAccount.registeredOn,
    //         expiresOn: tokenOfAccount.expiresOn,
    //         licenseState: tokenOfAccount.state,
    //         deviceId: tokenOfAccount.deviceId
    //     }
    //     tokens.push(token);
    // }
    // console.    log('---------------', tokens)
})();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
