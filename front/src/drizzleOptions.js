import HumanHashesStorage from './../build/contracts/HumanHashesStorage.json'

const drizzleOptions = {
    web3: {
        block: false,
        fallback: {
            type: 'ws',
            url: 'ws://127.0.0.1:8545'
        }
    },
    contracts: [
        HumanHashesStorage,
    ],
    events: {
        HumanHashesStorage: ['ProfileCreated', 'ProfileHibernated']
    },
    polls: {
        accounts: 1500
    }
}

export default drizzleOptions