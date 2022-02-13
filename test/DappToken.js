const DappToken = artifacts.require('../contracts/DappToken');

contract('DappToken', function (accounts) {
    let instance;

    it("sets the total supply upon development", () => {
        return DappToken.deployed().then((inst) => {
            instance = inst;
            return instance.totalSupply();
        }).then(totalSupply => {
            assert.equal(totalSupply.toNumber(), 1000000, "sets the totalSupply of the token to 1000000");
        })
    })
})