const DappToken = artifacts.require('../contracts/DappToken.sol');
const DappTokenSale = artifacts.require('../contracts/DappTokenSale.sol');


module.exports = function (deployer) {
	deployer.deploy(DappToken, 1000000).then(() => {
		return deployer.deploy(DappTokenSale, DappToken.address, 1000000);
	});
}