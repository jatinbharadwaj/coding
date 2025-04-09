class Book {
    constructor(id, title, authors, publishers) {
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.publishers = publishers;
        this.copies = [];
    }

    addCopy(copyId) {
        this.copies.push(copyId);
    }

    removeCopy(copyId) {
        this.copies = this.copies.filter(id => id !== copyId);
    }

    hasCopy(copyId) {
        return this.copies.includes(copyId);
    }
}

module.exports = Book;