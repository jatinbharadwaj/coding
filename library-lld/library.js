const Book = require('./book');
const BookCopy = require('./bookCopy');
const Rack = require('./rack');
const User = require('./user');

class Library {
    constructor(id, numberOfRacks) {
        this.id = id;
        this.racks = this.initializeRacks(numberOfRacks);
        this.books = new Map();
        this.bookCopies = new Map();
        this.users = new Map();
    }

    initializeRacks(numberOfRacks) {
        const racks = [];
        for (let i = 1; i <= numberOfRacks; i++) {
            racks.push(new Rack(i));
        }
        return racks;
    }

    addBook(bookId, title, authors, publishers, copyIds) {
        if (this.books.has(bookId)) {
            return false;
        }

        const book = new Book(bookId, title, authors.split(','), publishers.split(','));
        this.books.set(bookId, book);

        const availableRacks = this.getAvailableRacks(copyIds.length);
        if (availableRacks.length < copyIds.length) {
            this.books.delete(bookId);
            return false;
        }

        copyIds.forEach((copyId, index) => {
            const bookCopy = new BookCopy(copyId, bookId, availableRacks[index].number);
            this.bookCopies.set(copyId, bookCopy);
            book.addCopy(copyId);
            availableRacks[index].addBookCopy(copyId);
        });

        return availableRacks.map(rack => rack.number);
    }

    getAvailableRacks(count) {
        return this.racks
            .filter(rack => rack.isAvailable())
            .slice(0, count);
    }

    removeBookCopy(copyId) {
        if (!this.bookCopies.has(copyId)) {
            return null;
        }

        const bookCopy = this.bookCopies.get(copyId);
        if (!bookCopy.isAvailable()) {
            return null;
        }

        const rack = this.racks.find(r => r.number === bookCopy.rackNumber);
        if (!rack) {
            return null;
        }

        rack.removeBookCopy();
        const book = this.books.get(bookCopy.bookId);
        book.removeCopy(copyId);
        this.bookCopies.delete(copyId);

        return rack.number;
    }

    borrowBookByBookId(bookId, userId, dueDate) {
        if (!this.books.has(bookId)) {
            return { success: false, error: 'Invalid Book ID' };
        }

        const user = this.users.get(userId) || new User(userId, 'Unknown');
        this.users.set(userId, user);

        if (!user.canBorrow()) {
            return { success: false, error: 'Overlimit' };
        }

        const book = this.books.get(bookId);
        for (const copyId of book.copies) {
            const bookCopy = this.bookCopies.get(copyId);
            if (bookCopy.isAvailable()) {
                return this.borrowBookCopyInternal(bookCopy, user, dueDate);
            }
        }

        return { success: false, error: 'Not available' };
    }

    borrowBookByCopyId(copyId, userId, dueDate) {
        if (!this.bookCopies.has(copyId)) {
            return { success: false, error: 'Invalid Book Copy ID' };
        }

        const user = this.users.get(userId) || new User(userId, 'Unknown');
        this.users.set(userId, user);

        if (!user.canBorrow()) {
            return { success: false, error: 'Overlimit' };
        }

        const bookCopy = this.bookCopies.get(copyId);
        if (!bookCopy.isAvailable()) {
            return { success: false, error: 'Not available' };
        }

        return this.borrowBookCopyInternal(bookCopy, user, dueDate);
    }

    borrowBookCopyInternal(bookCopy, user, dueDate) {
        const rackNumber = bookCopy.rackNumber;
        const rack = this.racks.find(r => r.number === rackNumber);
        rack.removeBookCopy();
        bookCopy.borrow(user.id, dueDate);
        user.borrowBook(bookCopy.id);

        return { success: true, rackNumber };
    }

    returnBookCopy(copyId) {
        if (!this.bookCopies.has(copyId)) {
            return { success: false, error: 'Invalid Book Copy ID' };
        }

        const bookCopy = this.bookCopies.get(copyId);
        if (bookCopy.isAvailable()) {
            return { success: false, error: 'Book not borrowed' };
        }

        const user = this.users.get(bookCopy.borrowedBy);
        user.returnBook(copyId);

        const availableRack = this.getAvailableRacks(1)[0];
        if (!availableRack) {
            return { success: false, error: 'No available racks' };
        }

        bookCopy.returnBook(availableRack.number);
        availableRack.addBookCopy(copyId);

        return { success: true, rackNumber: availableRack.number };
    }

    getBorrowedBooks(userId) {
        if (!this.users.has(userId)) {
            return [];
        }
        return this.users.get(userId).getBorrowedBooks();
    }

    searchByAttribute(attribute, value) {
        const results = [];

        for (const book of this.books.values()) {
            let matches = false;

            switch (attribute) {
                case 'book_id':
                    matches = book.id === value;
                    break;
                case 'author':
                    matches = book.authors.includes(value);
                    break;
                case 'publisher':
                    matches = book.publishers.includes(value);
                    break;
            }

            if (matches) {
                for (const copyId of book.copies) {
                    const bookCopy = this.bookCopies.get(copyId);
                    results.push({
                        bookCopy,
                        book,
                        rackNumber: bookCopy.isAvailable() ? bookCopy.rackNumber : -1
                    });
                }
            }
        }

        // Sort by rack number (available copies first)
        return results.sort((a, b) => {
            if (a.rackNumber === -1 && b.rackNumber === -1) return 0;
            if (a.rackNumber === -1) return 1;
            if (b.rackNumber === -1) return -1;
            return a.rackNumber - b.rackNumber;
        });
    }
}

module.exports = Library;