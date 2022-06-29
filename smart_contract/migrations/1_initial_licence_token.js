const LicenseToken = artifacts.require('LicenseToken')

module.exports = function (deployer, network, accounts) {
  deployer.deploy(LicenseToken)
}