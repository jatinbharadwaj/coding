const Board = require('./board');
const Player = require('./player');

class GameEngine {
    constructor() {
        this.board = new Board();
        this.players = [];
        this.currentPlayerIndex = 0;
        this.gameOver = false;
        this.winner = null;
    }

    initializePlayers(playerXName, playerOName) {
        this.players = [
            new Player('X', playerXName),
            new Player('O', playerOName)
        ];
    }

    makeMove(row, col) {
        if (this.gameOver) return false;

        const player = this.players[this.currentPlayerIndex];
        const adjustedRow = row - 1;
        const adjustedCol = col - 1;

        // Validate move
        if (adjustedRow < 0 || adjustedRow >= this.board.size ||
            adjustedCol < 0 || adjustedCol >= this.board.size) {
            return false;
        }

        if (!this.board.placeSymbol(adjustedRow, adjustedCol, player.symbol)) {
            return false;
        }

        // Check for win
        if (this.board.checkWin(player.symbol)) {
            this.gameOver = true;
            this.winner = player;
            return true;
        }

        // Check for draw
        if (this.board.isFull()) {
            this.gameOver = true;
            return true;
        }

        // Switch players
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        return true;
    }

    printBoard() {
        this.board.print();
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
}

module.exports = GameEngine;