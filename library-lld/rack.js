class Rack {
    constructor(number) {
        this.number = number;
        this.bookCopyId = null;
    }

    isAvailable() {
        return this.bookCopyId === null;
    }

    addBookCopy(copyId) {
        if (this.isAvailable()) {
            this.bookCopyId = copyId;
            return true;
        }
        return false;
    }

    removeBookCopy() {
        const copyId = this.bookCopyId;
        this.bookCopyId = null;
        return copyId;
    }
}

module.exports = Rack;