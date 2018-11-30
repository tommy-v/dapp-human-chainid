#!/bin/sh

KEY_FILE="/node.key"

if [ x"${PRIVATE_KEY}" != "x" ]; then
    echo -n "${PRIVATE_KEY}" > "${KEY_FILE}"
fi

# Execute bootnode
exec /usr/local/bin/bootnode --nodekey="${KEY_FILE}"
