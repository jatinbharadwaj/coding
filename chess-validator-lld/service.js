const readline = require('readline');
const Game = require('./game');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = new Game();

// Print initial board
game.printBoard();
console.log();

rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
    }

    const [startPos, endPos] = input.split(' ');

    if (game.makeMove(startPos, endPos)) {
        game.printBoard();
        console.log();
    } else {
        console.log('Invalid Move');
    }
}).on('close', () => {
    process.exit(0);
});