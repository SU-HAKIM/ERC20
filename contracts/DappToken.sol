//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

contract DappToken{ 
    //State Variable
    string public name="DApp Token";
    string public symbol="DAPP";
    string public standard="DApp Token v1.0";
    uint256 public totalSupply;

    //mapping
    mapping(address=>uint256) public balanceOf;

    //events
    event Transfer
    (
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    //constructor
    constructor(uint256 _totalSupply){
        balanceOf[msg.sender]=_totalSupply;
        totalSupply=_totalSupply;
    }

    function transfer(address _to,uint256 _value) public returns(bool _success){
        //validate
        require(balanceOf[msg.sender] >= _value);
        //change amounts
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;
        //emit events
        emit Transfer(msg.sender, _to, _value);

        //return success
        return true;
    }

}