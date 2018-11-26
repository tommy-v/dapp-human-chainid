import * as sjcl from 'sjcl';

export function createHashString(input) {
    let arr = (new sjcl.hash.sha256()).update(input).finalize();
    let out = "", i;
    for (i = 0; i < arr.length; i++) {
        out += ((arr[i] | 0) + 0xF00000000000).toString(16).substr(4)
    }
    let str64 = out.substr(0, sjcl.bitArray.bitLength(arr) / 4);
    return "0x" + str64.slice(30)
}