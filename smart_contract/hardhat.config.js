// https://eth-ropsten.alchemyapi.io/v2/uI3NvRqgjKXnHpv3LosRDHakm5KSdKl_

require('dotenv').config();
require('@nomiclabs/hardhat-waffle');


module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
}