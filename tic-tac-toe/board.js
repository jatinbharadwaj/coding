class Board {
    constructor(size = 3) {
        this.size = size;
        this.grid = Array(size).fill().map(() => Array(size).fill('-'));
    }

    isCellEmpty(row, col) {
        return this.grid[row][col] === '-';
    }

    placeSymbol(row, col, symbol) {
        if (this.isCellEmpty(row, col)) {
            this.grid[row][col] = symbol;
            return true;
        }
        return false;
    }

    checkWin(symbol) {
        // Check rows
        for (let row = 0; row < this.size; row++) {
            if (this.grid[row].every(cell => cell === symbol)) {
                return true;
            }
        }

        // Check columns
        for (let col = 0; col < this.size; col++) {
            if (this.grid.every(row => row[col] === symbol)) {
                return true;
            }
        }

        // Check diagonals
        if (this.grid.every((row, i) => row[i] === symbol)) {
            return true;
        }

        if (this.grid.every((row, i) => row[this.size - 1 - i] === symbol)) {
            return true;
        }

        return false;
    }

    isFull() {
        return this.grid.every(row => row.every(cell => cell !== '-'));
    }

    print() {
        for (let row of this.grid) {
            console.log(row.join(' '));
        }
    }
}

module.exports = Board;