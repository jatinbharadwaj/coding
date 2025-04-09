class BookCopy {
    constructor(id, bookId, rackNumber = null, borrowedBy = null, dueDate = null) {
        this.id = id;
        this.bookId = bookId;
        this.rackNumber = rackNumber;
        this.borrowedBy = borrowedBy;
        this.dueDate = dueDate;
    }

    isAvailable() {
        return this.borrowedBy === null;
    }

    borrow(userId, dueDate) {
        this.borrowedBy = userId;
        this.dueDate = dueDate;
        this.rackNumber = null;
    }

    returnBook(rackNumber) {
        this.borrowedBy = null;
        this.dueDate = null;
        this.rackNumber = rackNumber;
    }
}

module.exports = BookCopy;