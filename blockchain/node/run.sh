#!/bin/sh

DATA_DIR=/data
BOOTNODE_NAME=bootnode
ETHSTATS_NAME=ethstats
PASSWORD=NOTARANDOMPASSWORD
password_file=/signer.pass
GENESIS_PATH=/genesis.json
if [ x"${CORS_DOMAIN}" == x ]; then
  CORS_DOMAIN=*
fi
if [ x"${NETWORK_ID}" == x ]; then
  NETWORK_ID=29957
fi

gethcmd="/usr/local/bin/geth --datadir "${DATA_DIR}" --cache 512"
bootnodeip=`dig +short "${BOOTNODE_NAME}" | head -n 1`
# ethstatsip=`dig +short "${ETHSTATS_NAME}" | head -n 1`

# if [ x"${ethstatsip}" != "x" ] && [ x"${WS_SECRET}" != "x" ]; then
#   echo "Reporting stats to ${ethstatsip}"
#   statsopts="--ethstats ${HOSTNAME}:${WS_SECRET}@${ethstatsip}:3000"
# else
#   echo "Not reporting stats, ethstats not present or WS_SECRET not set"
# fi
bootnode_list="enode://${ENODE_PUBKEY}@${bootnodeip}:30303?discport=30301"
echo "${PASSWORD}" > "${password_file}"

# Import genesis and start the node with it
import_genesis() {
  file_size=$(wc -c < "$GENESIS_PATH")
  if [ $file_size -gt 1 ] && \
      $gethcmd init "${GENESIS_PATH}"; then
      echo "Genesis imported"
  else
      echo "Could not import init, bad genesis.json"
      exit 1
  fi
}

# Account import
import_key() {
  pkey_file=$(mktemp)
  echo "${PRIVATE_KEY}" > "${pkey_file}"
  $gethcmd --datadir "${DATA_DIR}" --password "${password_file}" account import "${pkey_file}"
  rm "${pkey_file}"
}

if [ x"${PRIVATE_KEY}" != "x" ]; then
  echo "Importing private key"
  import_key
fi

if ! [ -d "${DATA_DIR}"/geth/chaindata ]; then
  echo "Importing genesis"
  import_genesis
fi

ETHERBASE=`echo -n "${ETHERBASE}" | sed "s:\(0x\|^\)\(.*\):\2:"`

if [ x"${ETHERBASE}" == "x" ]; then
    echo "No keystore file, node won't be a sealer"
    modules="eth,web3,net"
else
  keystore_file=`ls ${DATA_DIR}/keystore | grep -i "${ETHERBASE}"`
  echo "keystore_file  ${keystore_file}"
  mineopts="--mine --minerthreads 1 --etherbase ${ETHERBASE} --unlock 0 --password ${password_file}"
  modules="db,clique,eth,net,web3"

  # Random sleep to prevent all sealer to start at the same time
  sleep $(( ( RANDOM % 10 )  + 1 ))
  echo "Mining for ${ETHERBASE}"
fi

exec $gethcmd \
 --networkid "${NETWORK_ID}" \
 --maxpeers 100 \
 ${mineopts} \
 --bootnodes "${bootnode_list}" \
 ${statsopts} \
 --rpcvhosts=${CORS_DOMAIN} \
 --rpc \
 --rpccorsdomain "${CORS_DOMAIN}" \
 --rpcapi "${modules}" \
 --rpcaddr "0.0.0.0" \
 --ws \
 --wsaddr "0.0.0.0" \
 --wsapi "${modules}" \
 --wsorigins "${CORS_DOMAIN}"
