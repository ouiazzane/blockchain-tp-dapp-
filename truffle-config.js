const path = require('path');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777',
      gas: 6721975,
      gasPrice: 20000000000,
    },
    ganache: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      gas: 6721975,
      gasPrice: 20000000000,
    },
  },
  contracts_build_directory: path.join(__dirname, 'build', 'contracts'),
  compilers: {
    solc: {
      version: '0.8.21',
      settings: {
        evmVersion: 'london',
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
