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

## **_Rules_**

---
