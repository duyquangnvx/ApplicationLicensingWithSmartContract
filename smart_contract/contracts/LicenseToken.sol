 pragma solidity 0.8.7;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "https://github.com/0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";

contract LicenseToken is Ownable, ERC721 {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  enum LicenseType {WIN, MAC}
  enum LicenseState {ACTIVE, INACTIVE, EXPIRED}
   
  uint constant LICENSE_LIFE_TIME = 30 days;
   
  struct LicenseInfo {
    LicenseType licenseType;
    uint registeredOn;
    uint expiresOn;
    LicenseState state;
    string deviceId;
  }
   
  LicenseInfo[] tokens;
  event LicenseGiven(address account, uint256 tokenId);
   
  constructor(string memory name, string memory symbol) ERC721(name, symbol)  {}
   
   function transferFrom(address from, address to, uint256 tokenId) onlyOwner public virtual override {
     ERC721.transferFrom(from, to, tokenId);
   }

  // licensing logic
  function giveLicense(address _account, uint _type) onlyOwner public {
    uint256 tokenId = _tokenIds.current();
    _tokenIds.increment();
    _mint(_account, tokenId);
    _createLicense(_type);
    emit LicenseGiven(_account, tokenId);
  }

  function _createLicense(uint256 _type) onlyOwner internal {
    LicenseInfo memory token = LicenseInfo({
        licenseType: LicenseType(_type),
        state: LicenseState.INACTIVE,
        registeredOn: block.timestamp,
        expiresOn: 0,
        deviceId: ""
    });
    tokens.push(token);
  }

  function _getTokenByTokenId(uint256 _tokenId) onlyOwner internal view returns (LicenseInfo storage) {
    require(_exists(_tokenId), "tokenId is not available!");
    return tokens[_tokenId];
  }
   

  function activate(address _account, uint256 _tokenId, string memory _deviceId) onlyOwner public {
    require(_exists(_tokenId), "tokenId is not available!");
    require(ownerOf(_tokenId) == _account);
    LicenseInfo storage token = _getTokenByTokenId(_tokenId);
    require(token.registeredOn != 0);
    require(token.state == LicenseState.INACTIVE);
   
    token.state = LicenseState.ACTIVE;
    token.expiresOn = block.timestamp + LICENSE_LIFE_TIME;
    token.deviceId = _deviceId;
  }
   
  function isLicenseActive(address _account, uint256 _tokenId) public view returns (uint state){
    require(_exists(_tokenId), "tokenId is not available!");
    require(ownerOf(_tokenId) == _account);
   
    LicenseInfo memory token = _getTokenByTokenId(_tokenId);
    if (token.expiresOn < block.timestamp && token.state == LicenseState.ACTIVE) {
       return uint(LicenseState.EXPIRED);
    }
   
    return uint(token.state);
  }
   
  function handleExpiredLicense(address _account, uint256 _tokenId) onlyOwner public {
    require(_exists(_tokenId), "tokenId is not available!");
    require(ownerOf(_tokenId) == _account);
   
    LicenseInfo storage token = _getTokenByTokenId(_tokenId);
    if (token.expiresOn < block.timestamp && token.state == LicenseState.ACTIVE) {
       _burn(_tokenId);
       delete tokens[_tokenId];
    }
  }
   
  // internal methods
  function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
    return ownerOf(_tokenId) == _claimant;
  }
}