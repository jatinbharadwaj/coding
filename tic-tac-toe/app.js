const readline = require('readline');
const GameEngine = require('./gameEngine');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = new GameEngine();

// Ask for player names
rl.question('Enter name for X player: ', (playerXName) => {
    rl.question('Enter name for O player: ', (playerOName) => {
        game.initializePlayers(playerXName, playerOName);
        console.log('Initial board:');
        game.printBoard();
        promptMove();
    });
});

function promptMove() {
    rl.question(`Enter move for ${game.getCurrentPlayer().name} (row col): `, (input) => {
        if (input.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        const [row, col] = input.split(' ').map(Number);

        if (game.makeMove(row, col)) {
            game.printBoard();

            if (game.gameOver) {
                if (game.winner) {
                    console.log(`${game.winner.name} won the game`);
                } else {
                    console.log('Game Over');
                }
                rl.close();
                return;
            }
        } else {
            console.log('Invalid Move');
        }

        promptMove();
    });
}