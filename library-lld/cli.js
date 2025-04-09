const readline = require('readline');
const LibraryService = require('./libraryService');

class CLI {
    constructor() {
        this.service = new LibraryService();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start() {
        this.rl.on('line', (input) => {
            if (input.toLowerCase() === 'exit') {
                this.rl.close();
                return;
            }

            const [command, ...args] = input.split(' ');
            let result;

            try {
                switch (command) {
                    case 'create_library':
                        result = this.service.createLibrary(args[0], args[1]);
                        break;
                    case 'add_book':
                        result = this.service.addBook(args[0], args[1], args[2], args[3], args[4]);
                        break;
                    case 'remove_book_copy':
                        result = this.service.removeBookCopy(args[0]);
                        break;
                    case 'borrow_book':
                        result = this.service.borrowBook(args[0], args[1], args[2]);
                        break;
                    case 'borrow_book_copy':
                        result = this.service.borrowBookCopy(args[0], args[1], args[2]);
                        break;
                    case 'return_book_copy':
                        result = this.service.returnBookCopy(args[0]);
                        break;
                    case 'print_borrowed':
                        result = this.service.printBorrowed(args[0]);
                        break;
                    case 'search':
                        result = this.service.search(args[0], args[1]);
                        break;
                    default:
                        result = 'Invalid command';
                }
                console.log(result || '');
            } catch (error) {
                console.log('Error:', error.message);
            }
        });

        this.rl.on('close', () => {
            process.exit(0);
        });
    }
}

module.exports = CLI;