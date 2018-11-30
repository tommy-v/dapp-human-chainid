pragma solidity ^0.4.24;

contract HumanHashesStorage {
    struct HumanHashStruct {
        bool isActive;
    }

    event ProfileCreated(
        bytes32 humanHash,
        string msg
    );

    event ProfileHibernated(
        bytes32 humanHash,
        string msg
    );

    mapping (bytes32 => HumanHashStruct) public humanHashStructs;

    function isProfileStored(bytes32 _humanHash) public constant returns(bool isIndeed) {
        return humanHashStructs[_humanHash].isActive;
    }

    function registerProfile(bytes32 _humanHash) public returns(bool succes) {
        require(!isProfileStored(_humanHash));
        humanHashStructs[_humanHash].isActive = true;
        emit ProfileCreated(_humanHash, "Hash added to SC");
        return true;
    }

    function hibernateProfile(bytes32 _humanHash) public returns(bool success) {
        require(isProfileStored(_humanHash));
        humanHashStructs[_humanHash].isActive = false;
        emit ProfileHibernated(_humanHash, "Hash status set to inactive");
        return true;
    }
}