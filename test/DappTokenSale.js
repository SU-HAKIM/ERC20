const DappTokenSale = artifacts.require('../contracts/DappTokenSale.sol');

contract("DappTokenSale", accounts => {
    let tokenSaleInstance;
    let tokenPrice = 1000000;
    let numberOfTokens = 20;
    let value = numberOfTokens * tokenPrice;
    let buyer = accounts[1];

    it('initializes contract with the correct values', () => {
        return DappTokenSale.deployed().then(inst => {
            tokenSaleInstance = inst;

            return tokenSaleInstance.address;
        }).then(address => {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).then(address => {
            assert.notEqual(address, 0x0, 'has token contract');
            return tokenSaleInstance.tokenPrice();
        }).then(price => {
            assert.equal(price, tokenPrice, "token price is correct")
        })
    });

    it("facilitates token buying", () => {
        return DappTokenSale.deployed().then((inst) => {
            tokenSaleInstance = inst;
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value });
        }).then(receipt => {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchase tokens');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the numbers if token purchased');
            return tokenSaleInstance.tokensSold();
        }).then(amount => {
            assert.equal(amount.toNumber(), 20);
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 10 })
        }).then(assert.fail).catch(error => {
            assert(error.message.indexOf('revert') >= 0, "should send right value")
        })
    })
});