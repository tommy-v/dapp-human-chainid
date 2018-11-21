pragma solidity 0.4.24;
import './lib/HumanHashesStorage.sol';

contract HumainChainIdLogic {
    HumanHashesStorage public humanHashesExternalStorage;

    // mapping(bytes32 => bool) public humanHashes;
    // uint public humanHashesCount;

    constructor(address _externalStorageAddress) {
        humanHashesExternalStorage = HumanHashesStorage(_externalStorageAddress);
    }

    // function addHumanHash(bytes32 humanDataHash) private {
    //     humanHashesCount++;
    //     humanHashes[humanDataHash] = true;
    // }

    function register(bytes32 humanDataHash) public {
        humanHashesExternalStorage.addHumanHash(humanDataHash);
    }

}