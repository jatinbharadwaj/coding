const Board = require('./board');
const Player = require('./player');
const Dice = require('./dice');

class GameEngine {
    constructor() {
        this.board = new Board();
        this.players = [];
        this.dice = new Dice();
        this.currentPlayerIndex = 0;
        this.gameOver = false;
        this.winner = null;
    }

    initialize(snakes, ladders, playerNames) {
        // Add snakes to the board
        snakes.forEach(([head, tail]) => {
            this.board.addSnake(head, tail);
        });

        // Add ladders to the board
        ladders.forEach(([start, end]) => {
            this.board.addLadder(start, end);
        });

        // Create players
        this.players = playerNames.map(name => new Player(name));
    }

    playTurn() {
        if (this.gameOver) {
            return { gameOver: true, winner: this.winner };
        }

        const player = this.players[this.currentPlayerIndex];
        const diceValue = this.dice.roll();
        const { moved, newPosition } = player.move(diceValue, this.board);

        const result = {
            player: player.name,
            diceValue,
            fromPosition: player.position - diceValue,
            toPosition: player.position,
            moved,
            extraTurn: diceValue === 6 && !this.gameOver,
            gameOver: false,
            winner: null
        };

        // Check for win condition
        if (this.board.isWinningPosition(player.position)) {
            this.gameOver = true;
            this.winner = player.name;
            result.gameOver = true;
            result.winner = player.name;
            return result;
        }

        // Handle optional rule: 3 consecutive sixes cancel out
        if (player.consecutiveSixes === 3) {
            player.position = 0;
            player.resetConsecutiveSixes();
            result.toPosition = 0;
            result.extraTurn = false;
        }

        // Move to next player if no extra turn
        if (!result.extraTurn) {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }

        return result;
    }

    isGameOver() {
        return this.gameOver;
    }
}

module.exports = GameEngine;