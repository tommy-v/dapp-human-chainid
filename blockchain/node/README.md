### Node service
PoA blockchain 
- RPC backend with Websocket and HTTP enabled.
- It connects first to a bootnode named ```bootnode``` authorized via ENODE_PUBKEY below


## Environments

 * PRIVATE_KEY:  Bootnode private key, used by the node to seal blocks
 * ETHERBASE:    Address derived from the PRIVATE_KEY
 * ENODE_PUBKEY: Bootnode public key, must be derived from the bootnode PRIVATE_KEY. Check "*## Derive public key from private key*" if you don't know how.
 * WS_SECRET:    Ethstats password
 * CORS_DOMAIN:  Cross-Origin Resource Sharing, default to *

 If no PRIVATE_KEY or ETHERBASE could be set, the node will act as simple relay
 node.

## Volumes

 * /genesis.json: File path of the Genesis file

## Derive **public** key from **private** key

Using node

```
const Wallet = require('ethereumjs-wallet');
console.log(Wallet.fromPrivateKey(Buffer.from('14405648ef5dcd96316189670bbec064a5a0717ef48c8a0edfca9b2a1bddbc7f', 'hex')).getPublicKey().toString('hex'));
```