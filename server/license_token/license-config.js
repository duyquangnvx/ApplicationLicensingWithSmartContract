const LicenseConfig = (() => {
    const ONE_DAY_MIL = 86400; 
    const LICENSE_LIFE_TIME = 30 * ONE_DAY_MIL;   // days
    return {

        LICENSE_TYPE_WINDOWS: 0,
        LICENSE_TYPE_MAC: 1,
        LICENSE_STATE_ACTIVE: 0,
        LICENSE_STATE_INACTIVE: 1,
        LICENSE_STATE_EXPIRED: 2,

        getLicenseTimeLife: () => {
            return LICENSE_LIFE_TIME;
        }
    }
})();

module.exports = LicenseConfig;