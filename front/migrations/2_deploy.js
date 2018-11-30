var HumainChainIdLogic = artifacts.require("./HumainChainIdLogic.sol");
var HumanHashesStorage = artifacts.require("./HumanHashesStorage.sol");

module.exports = function(deployer) {
    return deployer.deploy(HumanHashesStorage).then(function() {
        return deployer.deploy(HumainChainIdLogic, HumanHashesStorage.address)
    })
};
