const ResponseUtil = require('../base/response-util');
const baseUrl = '/license'

const LicenseToken = require('../license-token');
module.exports = (app) => {
    app.post(`${baseUrl}/buy`, async (req, res) => {
        try {
            const address = req.body.address;    
            const result = await LicenseToken.send(LicenseToken.METHOD_GIVE_LICENSE, address, LicenseToken.LICENSE_TYPE_WINDOWS);
            const tokenId = result.events.LicenseGiven.returnValues.tokenId;
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, 
                {
                    tokenId: tokenId
                }
            );
            res.json(message);
        } catch (error) {
            ResponseUtil.handleError(res, error);
        }
    });

    app.post(`${baseUrl}/license-info`, async (req, res) => {
        try {
            const address = req.body.address;   
            const tokenId = req.body.tokenId; 
            const token = await LicenseToken.getTokenInfo(address, tokenId);
            token.tokenId = token;
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, token);
            res.json(message);
        } catch (error) {
            ResponseUtil.handleError(res, error);
        }
    });

    app.post(`${baseUrl}/activate`, async (req, res) => {
        try {
            const address = req.body.address;   
            const tokenId = req.body.tokenId; 
            const deviceId = req.body.deviceId;
            const result = await LicenseToken.send(LicenseToken.METHOD_ACTIVATE, address, tokenId, deviceId);
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, {tokenId: tokenId});
            res.json(message);
        } catch (error) {
            ResponseUtil.handleError(res, error);
        }
    });

    app.post(`${baseUrl}/check-active`, async (req, res) => {
        try {
            const address = req.body.address;   
            const tokenId = req.body.tokenId; 
            
            const licenseState = await LicenseToken.call(LicenseToken.METHOD_IS_LICENSE_ACTIVE, address, tokenId);

            if (licenseState == LicenseToken.LICENSE_STATE_EXPIRED) {
                await LicenseToken.call(LicenseToken.METHOD_HANDLE_EXPIRED_LICENSE, address, tokenId);
                console.log('handleExpiredLicense', tokenId);
            }
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, 
                {
                    tokenId: tokenId,
                    licenseState: licenseState
                }
            );
            res.json(message);
        } catch (error) {
            ResponseUtil.handleError(res, error);
        }
    });

    app.post(`${baseUrl}/tokens-of-account`, async (req, res) => {
        try {
            const address = req.body.address;   
            const tokenId = req.body.tokenId; 
            
            const tokensOfAccount = await LicenseToken.call(LicenseToken.METHOD_GET_TOKENS_OF_ACCOUNT, address);
            const tokenIdsOfAccount = await LicenseToken.call(LicenseToken.METHOD_GET_TOKENS_ID_OF_ACCOUNT, address);

            const tokens = [];
            for (let i = 0; i < tokenIdsOfAccount.length; i++) {
                const tokenOfAccount = tokensOfAccount[i];
                const tokenIdOfAccount = tokenIdsOfAccount[i];
                const token = {
                    tokenId: tokenIdOfAccount,
                    licenseType: tokenOfAccount.licenseType,
                    registeredOn: tokenOfAccount.registeredOn,
                    expiresOn: tokenOfAccount.expiresOn,
                    licenseState: tokenOfAccount.state,
                    deviceId: tokenOfAccount.deviceId
                }
                tokens.push(token);
            }
            
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, 
                {
                    tokens: tokens
                }
            );
            res.json(message);
        } catch (error) {
            ResponseUtil.handleError(res, error);
        }
    });
}