const DappToken = artifacts.require('../contracts/DappToken');

contract('DappToken', function (accounts) {
    let instance;

    it("initializes the contract with the correct value", () => {
        return DappToken.deployed().then(inst => {
            instance = inst;
            return instance.name();
        }).then(name => {
            assert.equal(name, "DApp Token", "has the correct name");
            return instance.symbol();
        }).then(symbol => {
            assert.equal(symbol, "DAPP", "has the correct symbol");
            return instance.standard();
        }).then(standard => {
            assert.equal(standard, "DApp Token v1.0");
        })
    })

    it("sets the total supply upon development", () => {
        return DappToken.deployed().then((inst) => {
            instance = inst;
            return instance.totalSupply();
        }).then(totalSupply => {
            assert.equal(totalSupply.toNumber(), 1000000, "sets the totalSupply of the token to 1000000");
            return instance.balanceOf(accounts[0]);
        }).then(adminBalance => {
            assert.equal(adminBalance.toNumber(), 1000000, "it allocates the initial supply to the admin.")
        })
    })

    it("transfers token ownership", () => {
        return DappToken.deployed().then(inst => {
            instance = inst;
            return instance.transfer.call(accounts[1], 9999999999999);
        }).then(assert.fail).catch(error => {
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert keyword.");
            return instance.transfer.call(accounts[1], 100, { from: accounts[0] })
        }).then(success => {
            assert.equal(success, true, "it should return true.");
            return instance.transfer(accounts[1], 100, { from: accounts[0] });
        }).then(receipt => {
            assert.equal(receipt.logs.length, 1, "triggers one event.");
            assert.equal(receipt.logs[0].event, "Transfer", 'should be the "Transfer" event.');
            assert.equal(receipt.logs[0].args._from, accounts[0], "logs the account the tokens are transferred from");
            assert.equal(receipt.logs[0].args._to, accounts[1], "logs the account the tokens are transferred to.");
            assert.equal(receipt.logs[0].args._value, 100, "logs the transfer amount");
            return instance.balanceOf(accounts[1]);
        }).then(balance => {
            assert.equal(balance.toNumber(), 100, "adds the amounts to the receiving account.");
            return instance.balanceOf(accounts[0]);
        }).then(balance => {
            assert.equal(balance, 1000000 - 100);
        })
    })



})