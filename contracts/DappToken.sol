//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

contract DappToken{

    uint256 public totalSupply;

    constructor(uint256 _totalSupply){
        totalSupply=_totalSupply;
    }

}