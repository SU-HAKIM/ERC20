# Creating a Token

## **_Rules(Follows ERC20 standard)_**

---

**_State Variables_**

1. Token should have a name
2. Token should have a symbol

```java
string  public name = "DApp Token";
string  public symbol = "DAPP";
```

3. Token should have Two Events => Transfer and Approval

```c#
event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
);

event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
);

```

4. Token should have Two mapping => balanceOf and allowance

```c#
mapping(address => uint256) public balanceOf;
mapping(address => mapping(address => uint256)) public allowance;
```

5. Token should have a `constructor` that sets `admin balance` and `totalSupply` of Token.(msg.sender is admin)

```javascript
constructor(uint256 _initialSupply) {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
}
```

**_Functions_**

6. Token should have a `transfer` function to transfer token

```javascript
function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(msg.sender, _to, _value);

    return true;
}
```

7. Token should have a `approve` function where someone allows `spender` to withdraw/spend a fixed amount of token from his address.It also emits Approval event.

```javascript
 function approve(address _spender, uint256 _value) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;

    emit Approval(msg.sender, _spender, _value);

    return true;
}
```

8. Tokens should have a `transferFrom` function by which approved spender spends some token in fixed amount from that guys address who approve him . It emits `Transfer` event.

```javascript
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(_value <= balanceOf[_from]);
    require(_value <= allowance[_from][msg.sender]);

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;

    allowance[_from][msg.sender] -= _value;

    emit Transfer(_from, _to, _value);

    return true;
}
```

# Creating a ICO

_What is ICO ? It is a smart contract. Suppose you want to start a startup.So,you need capital.What most of the companies do they sells share or stock.But you thought that you will sell your own Token.In Future Token buyers can buy your products in lower cost by your Tokens._

## **_Rules_**

---

1. ICO smart contract should have an `admin,tokenPrice,amount of sold token` and it should have a instance of that token which it wants to sell.

```java
address  admin;
uint256 public tokenPrice;
uint256 public tokensSold;
DappToken public tokenContract;
```

2. ICO smart contract should have an event `Sell`;

```C#
event Sell(address _buyer,uint256 _amount);
```

3. ICO smart contract should have a constructor that sets admin , instance of Token contract , tokenPrice.Remember this admin and Tokens contract admin is same person.

```javascript
constructor(DappToken _tokenContract,uint256 _tokenPrice){
    admin=msg.sender;
    tokenContract=_tokenContract;
    tokenPrice=_tokenPrice;
}
```

4. A mount of Tokens should be transferred to this ICO smart contracts address

5. There should remain a `multiply` function for safety

```javascript
function multiply(uint x,uint y) internal pure returns(uint z){
    require(y == 0 || (z = x * y) / y == x);
}//from ds-math library
```

6. There should remain a function that enables people to buy Tokens from contract

```javascript
function buyTokens(uint256 _numberOfToken) public payable{
    require(msg.value == multiply(_numberOfToken , tokenPrice));
    require(tokenContract.balanceOf(address(this)) >=_numberOfToken);
    require(tokenContract.transfer(msg.sender,_numberOfToken));
    tokensSold+=_numberOfToken;
    emit Sell(msg.sender,_numberOfToken);
}
```

7. There should remain a function to End selling Tokens.Only `admin` can call this function.

```javascript
function endSale() public{
    require(msg.sender==admin);
    require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
    selfdestruct(payable(admin));
}
```
