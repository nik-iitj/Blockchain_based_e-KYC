pragma solidity 0.5.0;


contract StorageHash {

    string hash;

    function set(string memory _hash) public {

        hash = _hash;

    }

    function get() public view returns (string memory){

        return hash;

    }


}

// added the  files from the meme app
//copy all required packages
//npm install
//then sudo truffle compile