import * as sjcl from 'sjcl';

function hashString(input) {
    let stringifiedInput = JSON.stringify(input)
    let arr = (new sjcl.hash.sha256()).update(stringifiedInput).finalize();
    let out = "", i;
    for (i = 0; i < arr.length; i++) {
        out += ((arr[i] | 0) + 0xF00000000000).toString(16).substr(4)
    }
    return out.substr(0, sjcl.bitArray.bitLength(arr) / 4);
}

export default hashString;