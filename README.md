# dapp-human-chainid
Blockchain stuff

# Blockchain part (./blockchain)
## Truffle migrate
If you want to update and migrate the smartcontract (for testing purpose), you have to run `truffle-real-migrate.sh` in order to test the migration on you private blockchain (Ganache).

This script simply remove ./build and then migrate your contract. If you don't, you can have some "caching" issues. It's better to be sure that the new build is really new (even with the --reset --all flags, ./build isn't totally new an can disturb the results).

# Adding a new node
- Copy pas the nodeX section of the docker-compose
- Add a new privK (`PRIVATE_KEY`), and its derived address (`ETHERBASE`)
- Put the address 2 times inside the genesis file (`extraData` and `alloc`)
- Enjoy !

# Ethstats
Ethstats is listening via ws:8546
- Add `--ethstats flag` in your `geth` command inside **node/run.sh**
