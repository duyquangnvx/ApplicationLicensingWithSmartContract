const LicenseConfig = (() => {
    const config = require('../json/license-config.json');
    const ONE_DAY_MIL = 86400000; 
    return {
        LICENSE_TYPE_WINDOWS: 0,
        LICENSE_TYPE_MAC: 1,
        LICENSE_STATE_ACTIVE: 0,
        LICENSE_STATE_INACTIVE: 1,
        LICENSE_STATE_EXPIRED: 2,

        getLicenseTimeLife: () => {
            return config.licenseLifeTime * ONE_DAY_MIL;
        }
    }
})();

module.exports = LicenseConfig;