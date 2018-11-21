pragma solidity 0.4.24;

contract HumanHashesStorage {
    mapping(bytes32 => bool) public humanHashes;
    uint public humanHashesCount;

    constructor() {}
  
    function addHumanHash(bytes32 humanDataHash) public {
        require(!humanHashes[humanDataHash]);
        humanHashesCount++;
        humanHashes[humanDataHash] = true;
    }

    // function register(bytes32 humanDataHash) public {
    //     require(!humanHashes[humanDataHash]);
    //     addHumanHash(humanDataHash);
    // }

}