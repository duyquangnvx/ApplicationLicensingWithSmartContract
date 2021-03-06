const ResponseUtil = require('../base/response-util');
const LicenseConfig = require('../license_token/license-config');
const LicenseToken = require('../license_token/license-token');

module.exports = (app) => {
    const baseUrl = '/license'
    app.post(`${baseUrl}/buy`, async (req, res) => {
        try {
            const address = req.body.address;    
            const result = await LicenseToken.send(LicenseToken.METHOD_GIVE_LICENSE, address, LicenseConfig.LICENSE_TYPE_WINDOWS);
            const tokenId = result.events.LicenseGiven.returnValues.tokenId;
            const registeredOn = result.events.LicenseGiven.returnValues.registeredOn;
            console.log('-----------------', registeredOn, LicenseConfig.getLicenseTimeLife());
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, 
                {
                    tokenId: tokenId,
                    registeredOn: registeredOn,
                    licenseState: LicenseConfig.LICENSE_STATE_INACTIVE
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
            token.tokenId = tokenId;
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
            const licenseLifeTime = LicenseConfig.getLicenseTimeLife();
            const result = await LicenseToken.send(LicenseToken.METHOD_ACTIVATE, address, tokenId, deviceId, licenseLifeTime);
            
            const eventLicenseActivate = result.events.LicenseActivate;
            const licenseState = eventLicenseActivate.returnValues.state;
            const expiresOn = eventLicenseActivate.returnValues.expiresOn;
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, 
                {
                    tokenId: tokenId,
                    licenseState: licenseState,
                    expiresOn: expiresOn
                }
            );
            res.json(message);
        } catch (error) {
            ResponseUtil.handleError(res, error);
        }
    });

    app.post(`${baseUrl}/renewal`, async (req, res) => {
        try {
            const address = req.body.address;   
            const tokenId = req.body.tokenId; 
            const licenseLifeTime = LicenseConfig.getLicenseTimeLife();
            const result = await LicenseToken.send(LicenseToken.METHOD_RENEWAL, address, tokenId, licenseLifeTime);
            const eventLicenseRenewal = result.events.LicenseRenewal;
            const licenseState = eventLicenseRenewal.returnValues.state;
            const expiresOn = eventLicenseRenewal.returnValues.expiresOn;
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, 
                { 
                    tokenId: tokenId,
                    licenseState: licenseState,
                    expiresOn: expiresOn
                }
                );
            res.json(message);
        } catch (error) {
            ResponseUtil.handleError(res, error);
        }
    });

    app.post(`${baseUrl}/check-active`, async (req, res) => {
        try {
            const address = req.body.address;   
            const tokenId = req.body.tokenId; 
            
            const license = await LicenseToken.getTokenInfo(address, tokenId);
            const licenseState = await LicenseToken.call(LicenseToken.METHOD_IS_LICENSE_ACTIVE, address, tokenId);
            if (licenseState == LicenseConfig.LICENSE_STATE_EXPIRED) {
                if (license.licenseState == LicenseConfig.LICENSE_STATE_ACTIVE) {
                    console.log('handleExpiredLicense', tokenId);
                    await LicenseToken.send(LicenseToken.METHOD_HANDLE_EXPIRED_LICENSE, address, tokenId);
                }
            }
            const isLicenseExpired = licenseState == LicenseConfig.LICENSE_STATE_EXPIRED;
            console.log(`tokenId: ${tokenId}, isLicenseExpired: ${isLicenseExpired}`);

            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, 
                {
                    tokenId: tokenId,
                    licenseState: licenseState,
                    isLicenseExpired: isLicenseExpired
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

    app.post(`${baseUrl}/cheat-expired-license`, async (req, res) => {
        try {
            const address = req.body.address;   
            const tokenId = req.body.tokenId; 
            
            const result = await LicenseToken.send(LicenseToken.METHOD_CHEAT_EXPIRED_LICENSE, address, tokenId);
            console.log('cheat-expired-license successfully');
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_SUCCESS, 
                {
                    message: 'cheat-expired-license successfully' 
                }
            );
            res.json(message);
        } catch (error) {
            ResponseUtil.handleError(res, error);
        }
    });
}