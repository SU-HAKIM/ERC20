//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;
import "./DappToken.sol";


contract DappTokenSale{
    //Variables
    address admin;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    DappToken public tokenContract;

    //events
    event Sell(address _buyer,uint256 _amount);

    //constructor
    constructor(DappToken _tokenContract,uint256 _tokenPrice){
        admin=msg.sender;
        tokenContract=_tokenContract;
        tokenPrice=_tokenPrice;
    }


    //functions
    function multiply(uint x,uint y) internal pure returns(uint z){
        require(y == 0 || (z = x * y) / y == x);
    }//ds-math

    function buyTokens(uint256 _numberOfToken) public payable{
        require(msg.value == multiply(_numberOfToken ,  tokenPrice));
        tokensSold+=_numberOfToken;
        emit Sell(msg.sender,_numberOfToken);
    }
}