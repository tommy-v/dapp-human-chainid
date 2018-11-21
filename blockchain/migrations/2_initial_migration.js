var Migrations = artifacts.require("./Migrations.sol");
var HumainChainIdLogic = artifacts.require("./HumainChainIdLogic.sol");
var HumanHashesStorage = artifacts.require("./HumanHashesStorage.sol");



module.exports = function(deployer) {
  deployer.deploy(Migrations);

  return deployer.then(function () {
    return HumanHashesStorage.new()
  }).then(function (instance) {
    store = instance
    console.log('Storage : ', store.address)
    return HumainChainIdLogic.new(store.address)
  }).then(function (instance) {
    human = instance
    console.log('Human : ', human.address)
    //console.log('store owner : ', store.owner())
    
    // return store.owner()
    return true;
  })
//   .then(function (boss) {
//     console.log('store owner : ', boss)
//     return store.setPcoinContract(pc.address)
//   }).then(function (res) {
//     console.log('setPcoinContract : ', res)
//     return true
//     // console.log('Registering ben to Pcoin contract')
//     // return pc.register("0x25a03238B879d866fce223d5B6f6732Abe5Ea94C", "bmateo@adneom.com", "0x88687e1b6df776fb575d782a63ea3bd0a1e22796503c1fb615b5f643504c8f7c")
//   })
};
