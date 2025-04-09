const readline = require('readline');
const KeyValueStore = require('./keyValueStore');

class CLI {
    constructor() {
        this.store = new KeyValueStore();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start() {
        this.rl.on('line', async (input) => {
            if (input.toLowerCase() === 'exit') {
                this.rl.close();
                return;
            }

            const [command, ...args] = input.split(' ');
            try {
                switch (command.toLowerCase()) {
                    case 'get':
                        await this.handleGet(args);
                        break;
                    case 'put':
                        await this.handlePut(args);
                        break;
                    case 'delete':
                        await this.handleDelete(args);
                        break;
                    case 'search':
                        await this.handleSearch(args);
                        break;
                    case 'keys':
                        await this.handleKeys();
                        break;
                    default:
                        console.log('Invalid command');
                }
            } catch (error) {
                if (error.message === 'Data Type Error') {
                    console.log('Data Type Error');
                } else {
                    console.log('Error:', error.message);
                }
            }
        });

        this.rl.on('close', () => {
            process.exit(0);
        });
    }

    async handleGet(args) {
        if (args.length !== 1) {
            console.log('Invalid arguments for get command');
            return;
        }
        const key = args[0];
        const value = await this.store.get(key);
        if (value === null) {
            console.log(`No entry found for ${key}`);
        } else {
            console.log(value.toString());
        }
    }

    async handlePut(args) {
        if (args.length < 3 || args.length % 2 !== 1) {
            console.log('Invalid arguments for put command');
            return;
        }
        const key = args[0];
        const attributes = args.slice(1);
        await this.store.put(key, attributes);
    }

    async handleDelete(args) {
        if (args.length !== 1) {
            console.log('Invalid arguments for delete command');
            return;
        }
        const key = args[0];
        await this.store.delete(key);
    }

    async handleSearch(args) {
        if (args.length !== 2) {
            console.log('Invalid arguments for search command');
            return;
        }
        const attributeKey = args[0];
        const attributeValue = args[1];
        const results = await this.store.search(attributeKey, attributeValue);
        console.log(results.join(','));
    }

    async handleKeys() {
        const keys = await this.store.keys();
        console.log(keys.join(','));
    }
}

module.exports = CLI;