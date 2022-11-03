const StorageHash = artifacts.require("StorageHash");

module.exports = function(deployer) {
  deployer.deploy(StorageHash);
};
