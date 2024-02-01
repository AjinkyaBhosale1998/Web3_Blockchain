// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 < 0.9.0;

import "./EIP4973.sol";

contract ABT is ERC4973 {
    address public owner;
    uint256 public count = 0;

    constructor() IERC4973("MyToken", "MTK") {
        owner = msg.sender;
    }

    function burn(uint256 _tokenId) external override {
        require(ownerOf(_tokenId) == msg.sender || msg.sender == owner, "You can't revoke it");
        _burn(_tokenId);
    }

    function issue(address _issuee, string calldata _uri) external onlyOwner {
        _mint(_issuee, count, _uri);
        count += 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
}



















// pragma solidity >=0.7.0 < 0.9.0;


// contract ABT is ERC4973 {
//     address public owner;
//     uint256 public count = 0;

//     constructor () ERC4973("MyToken","MTK") {
//         owner = msg.sender;
//     }

//     function burn(uint256 _tokenId) external override {
//        require (ownerOf(_tokenId) == msg.sender || msg.sender == owner, " you cant revoke it") ;
//        _burn(_tokenId);
//     }

//     function issue(address _issuee, string calldata _uri) external onlyowner {
//         _mint(_issuee, count, _uri);
//         count += 1;
//     }

//     modifier onlyOwner() {
//         require( msg.sender == owner, "Not the owner");
//     }
// }