const LicenseToken = artifacts.require("./LicenseToken.sol");
  
contract('LicenseTokenTest', function (accounts) {
  it("test basic flow", async function() {
      let token = await LicenseToken.new({from: accounts[0]});
      let result = await token.giveLicense(accounts[1], 1, {from: accounts[0]});
      let tokenId = -1;
  
      // check transaction log for TokenMinted event in order to obtain the tokenId
      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];
        if (log.event == "LicenseGiven") {
           // We found the event!
  
           tokenId = log.args.tokenId.valueOf();
           break;
          }
      }
  
      let balance = await token.balanceOf(accounts[1]);
      assert.equal(balance, 1, "User has 1 token after getting license");
  
      let isActive = await token.isLicenseActive.call(accounts[1], tokenId);
      // 1 - LicenseType.INACTIVE
      assert.equal(isActive, 1, "License is not active.");
  
      await token.activate(accounts[1], tokenId, "UDID", 2);
      isActive = await token.isLicenseActive.call(accounts[1], tokenId);
      // 0 - LicenseType.ACTIVE
      assert.equal(isActive, 0, "License is active.");
  });
});