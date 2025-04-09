const Library = require('./library');

class LibraryService {
    constructor() {
        this.library = null;
    }

    createLibrary(libraryId, numberOfRacks) {
        this.library = new Library(libraryId, parseInt(numberOfRacks));
        return `Created library with ${numberOfRacks} racks`;
    }

    addBook(bookId, title, authors, publishers, copyIds) {
        if (!this.library) {
            return 'Library not created';
        }

        const rackNumbers = this.library.addBook(
            bookId,
            title,
            authors,
            publishers,
            copyIds.split(',')
        );

        if (!rackNumbers) {
            return 'Rack not available';
        }

        return `Added Book to racks: ${rackNumbers.join(',')}`;
    }

    removeBookCopy(copyId) {
        if (!this.library) {
            return 'Library not created';
        }

        const rackNumber = this.library.removeBookCopy(copyId);
        if (rackNumber === null) {
            return 'Invalid Book Copy ID';
        }

        return `Removed book copy: ${copyId} from rack: ${rackNumber}`;
    }

    borrowBook(bookId, userId, dueDate) {
        if (!this.library) {
            return 'Library not created';
        }

        const result = this.library.borrowBookByBookId(bookId, userId, dueDate);
        if (!result.success) {
            return result.error;
        }

        return `Borrowed Book from rack: ${result.rackNumber}`;
    }

    borrowBookCopy(copyId, userId, dueDate) {
        if (!this.library) {
            return 'Library not created';
        }

        const result = this.library.borrowBookByCopyId(copyId, userId, dueDate);
        if (!result.success) {
            return result.error;
        }

        return `Borrowed Book Copy from rack: ${result.rackNumber}`;
    }

    returnBookCopy(copyId) {
        if (!this.library) {
            return 'Library not created';
        }

        const result = this.library.returnBookCopy(copyId);
        if (!result.success) {
            return result.error;
        }

        return `Returned book copy ${copyId} and added to rack: ${result.rackNumber}`;
    }

    printBorrowed(userId) {
        if (!this.library) {
            return 'Library not created';
        }

        const borrowedBooks = this.library.getBorrowedBooks(userId);
        return borrowedBooks.map(copyId => {
            const bookCopy = this.library.bookCopies.get(copyId);
            return `Book Copy: ${copyId} ${bookCopy.dueDate}`;
        }).join('\n');
    }

    search(attribute, value) {
        if (!this.library) {
            return 'Library not created';
        }

        const results = this.library.searchByAttribute(attribute, value);
        return results.map(item => {
            const { bookCopy, book, rackNumber } = item;
            let line = `Book Copy: ${bookCopy.id} ${book.id} ${book.title} ${book.authors.join(',')} ${book.publishers.join(',')} ${rackNumber}`;

            if (!bookCopy.isAvailable()) {
                line += ` ${bookCopy.borrowedBy} ${bookCopy.dueDate}`;
            }

            return line;
        }).join('\n');
    }
}

module.exports = LibraryService;