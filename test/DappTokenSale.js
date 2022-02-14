const DappTokenSale = artifacts.require('../contracts/DappTokenSale.sol');
const DappToken = artifacts.require('../contracts/DappToken.sol');

contract("DappTokenSale", accounts => {
    let tokenSaleInstance;
    let tokenInstance;
    let tokenPrice = 1000000;
    let numberOfTokens = 20;
    let value = numberOfTokens * tokenPrice;
    let buyer = accounts[1];
    let admin = accounts[0];
    let tokensAvailable = 750000;

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
        return DappToken.deployed().then(inst => {
            tokenInstance = inst;
            return DappTokenSale.deployed()
        }).then((inst) => {
            tokenSaleInstance = inst;
            tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin });
        }).then(receipt => {
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value });
        }).then(receipt => {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchase tokens');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the numbers if token purchased');
            return tokenSaleInstance.tokensSold();
        }).then(amount => {
            assert.equal(amount.toNumber(), 20);
            return tokenInstance.balanceOf(buyer);
        }).then(balance => {
            assert.equal(balance.toNumber(), numberOfTokens);
            return tokenInstance.balanceOf(tokenSaleInstance.address);
        }).then(balance => {
            assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 10 })
        }).then(assert.fail).catch(error => {
            assert(error.message.indexOf('revert') >= 0, "should send right value");
            return tokenSaleInstance.buyTokens(800000, { from: buyer, value })
        }).then(assert.fail).catch(error => {
            assert(error.message.indexOf('revert') >= 0, "out of stock")
        })
    })

});


