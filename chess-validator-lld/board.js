const Pawn = require("./pawn");
const Rook = require("./rook");
const Knight = require("./knight");
const Bishop = require("./bishop");
const Queen = require("./queen");
const King = require("./king");

class Board {
    constructor() {
        this.grid = Array(8).fill().map(() => Array(8).fill(null));
        this.initializePieces();
    }

    initializePieces() {
        // Initialize pawns
        for (let col = 0; col < 8; col++) {
            this.grid[1][col] = new Pawn('B', [1, col]);
            this.grid[6][col] = new Pawn('W', [6, col]);
        }

        // Initialize other pieces
        const backRow = (color, row) => {
            this.grid[row][0] = new Rook(color, [row, 0]);
            this.grid[row][1] = new Knight(color, [row, 1]);
            this.grid[row][2] = new Bishop(color, [row, 2]);
            this.grid[row][3] = new Queen(color, [row, 3]);
            this.grid[row][4] = new King(color, [row, 4]);
            this.grid[row][5] = new Bishop(color, [row, 5]);
            this.grid[row][6] = new Knight(color, [row, 6]);
            this.grid[row][7] = new Rook(color, [row, 7]);
        };

        backRow('B', 0);
        backRow('W', 7);
    }

    getPiece(position) {
        const [row, col] = this.convertNotation(position);
        return this.grid[row][col];
    }

    movePiece(startPos, endPos) {
        const [startRow, startCol] = this.convertNotation(startPos);
        const [endRow, endCol] = this.convertNotation(endPos);

        const piece = this.grid[startRow][startCol];
        if (!piece) return false;

        this.grid[endRow][endCol] = piece;
        this.grid[startRow][startCol] = null;
        piece.position = [endRow, endCol];
        return true;
    }

    convertNotation(position) {
        const col = position.charCodeAt(0) - 'a'.charCodeAt(0);
        const row = 8 - parseInt(position[1]);
        return [row, col];
    }

    toNotation(row, col) {
        const letter = String.fromCharCode('a'.charCodeAt(0) + col);
        const number = 8 - row;
        return `${letter}${number}`;
    }

    isPositionValid(position) {
        const [row, col] = this.convertNotation(position);
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    isPathClear(startPos, endPos) {
        const [startRow, startCol] = this.convertNotation(startPos);
        const [endRow, endCol] = this.convertNotation(endPos);

        const rowStep = Math.sign(endRow - startRow);
        const colStep = Math.sign(endCol - startCol);

        let currentRow = startRow + rowStep;
        let currentCol = startCol + colStep;

        while (currentRow !== endRow || currentCol !== endCol) {
            if (this.grid[currentRow][currentCol] !== null) {
                return false;
            }
            currentRow += rowStep;
            currentCol += colStep;
        }

        return true;
    }

    print() {
        const pieceToSymbol = {
            'Pawn': 'P',
            'Rook': 'R',
            'Knight': 'N',
            'Bishop': 'B',
            'Queen': 'Q',
            'King': 'K'
        };

        for (let row = 0; row < 8; row++) {
            let rowStr = [];
            for (let col = 0; col < 8; col++) {
                const piece = this.grid[row][col];
                if (piece) {
                    rowStr.push(`${piece.color}${pieceToSymbol[piece.constructor.name]}`);
                } else {
                    rowStr.push('--');
                }
            }
            console.log(rowStr.join(' '));
        }
    }
}

module.exports = Board;