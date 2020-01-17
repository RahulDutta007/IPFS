const Authorx = artifacts.require("Authorx");
const Journalx = artifacts.require("Journalx");
module.exports = function(deployer) {
  deployer.deploy(Authorx).then(function() {
  	return deployer.deploy(Journalx, Authorx.address);
  });
};
