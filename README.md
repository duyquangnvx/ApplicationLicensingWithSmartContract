# Setup
  - cd truffle: npm install
  - cd app: npm install
  - cd server: npm install
  - sử dụng Ganache để deploy smart contract ở local

# Run Smart Contract
  1. cd truffle:
      + run test: truffle test
      + develop network: truffle migrate --network development --reset
      + testnet (ropsten): truffle migrate --network ropsten --reset
  2. copy contract address in terminal => pass to: server/license_token/license-token.js (CONTRACT_ADDRESS)
  3. Có thể check các transaction ở: https://ropsten.etherscan.io/

# Run Server
  1. cd server: nodemon server

# Run app
  1. cd app: npm start

# Để test license hết hạn:
  1. sử dụng postman:
    +  gửi api đến http://localhost:5000/license/cheat-expired-license
    + request body (json): {"address": "địa chỉ ví của người giữ license", "tokenId": "Id của license"}
    


## Commands:

  Contracts: Compile:         cd truffle && truffle compile
  Contracts: Test:            cd truffle && truffle test
  Contracts: Migrate:         cd truffle && truffle migrate
  Dapp: Run dev server:       cd client && npm start
  Dapp: Test:                 cd client && npm test
  Dapp: Build for production: cd client && npm run build