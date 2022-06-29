const { default: Web3 } = require('web3');
const utility = require('../utility');
const baseUrl = '/license'

const LicenseToken = require('../license-token');
module.exports = (app) => {

    app.get(`${baseUrl}/buy`, async (req, res) => {
        let address = req.address;       
        console.log('address', address);
        address = '0xF8712B39dC3725BDf92d66bEe6853bB3862F26Ea'
        let balance = await LicenseToken.call('balanceOf', address);
        console.log("________", balance)
        await LicenseToken.send('giveLicense', address, 1);
    });

    app.get(`${baseUrl}/list`, (req, res) => {

    });

    app.post(`${baseUrl}/history`, (req, res) => {

    });

    app.post(`${baseUrl}/activate`, (req, res) => {

    });

    app.post(`${baseUrl}/check`, (req, res) => {

    });
}