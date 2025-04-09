const Board = require('./board');

class Game {
    constructor() {
        this.board = new Board();
        this.currentPlayer = 'W';
        this.gameOver = false;
    }

    isValidMove(startPos, endPos) {
        if (!this.board.isPositionValid(startPos) || !this.board.isPositionValid(endPos)) {
            return false;
        }

        const piece = this.board.getPiece(startPos);
        if (!piece || piece.color !== this.currentPlayer) {
            return false;
        }

        return piece.isValidMove(this.board, startPos, endPos);
    }

    makeMove(startPos, endPos) {
        if (!this.isValidMove(startPos, endPos)) {
            return false;
        }

        this.board.movePiece(startPos, endPos);
        this.currentPlayer = this.currentPlayer === 'W' ? 'B' : 'W';
        return true;
    }

    printBoard() {
        this.board.print();
    }
}

module.exports = Game;