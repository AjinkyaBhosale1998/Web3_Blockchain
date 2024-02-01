// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 < 0.9.0;

contract bank{
    int bal=0;

    function deposite_money(int amt) public{
        bal+=amt;
    }

    
    function withdraw(int amt) public{
        bal-=amt;
    }

    function getBalance() public view returns(int) {
        return bal;
    }
}