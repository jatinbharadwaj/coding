class User {
    constructor(id, name, maxBooks = 5) {
        this.id = id;
        this.name = name;
        this.maxBooks = maxBooks;
        this.borrowedBooks = new Set();
    }

    canBorrow() {
        return this.borrowedBooks.size < this.maxBooks;
    }

    borrowBook(copyId) {
        if (this.canBorrow()) {
            this.borrowedBooks.add(copyId);
            return true;
        }
        return false;
    }

    returnBook(copyId) {
        return this.borrowedBooks.delete(copyId);
    }

    getBorrowedBooks() {
        return Array.from(this.borrowedBooks).sort();
    }
}

module.exports = User;