const Ballots = artifacts.require("Ballot.sol");
const NFT = artifacts.require("NFT");
const Market = artifacts.require("Market");

module.exports = function (deployer) {
  var namesOfProposal = ["Zhiyuan", "Rudra", "Tejaskumar", "NOTA"];
  deployer.deploy(Ballots, namesOfProposal);
  // deployer.deploy(NFT);
  // deployer.deploy(Market);
};
