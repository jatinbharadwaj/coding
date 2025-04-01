const GameEngine = require('./gameEngine');
const InputParser = require('./inputParser');

// Sample input data
const sampleInput = `
9
62 5
33 6
49 9
88 16
41 20
56 53
98 64
93 73
95 75
8
2 37
27 46
10 32
51 68
61 79
65 84
71 91
81 100
2
Gaurav
Sagar
`;

class SnakeAndLadderGame {
    constructor() {
        this.engine = new GameEngine();
    }

    startGame(input) {
        const { snakes, ladders, players } = InputParser.parseInput(input);
        this.engine.initialize(snakes, ladders, players);

        while (!this.engine.isGameOver()) {
            const result = this.engine.playTurn();
            this.printMove(result);

            if (result.gameOver) {
                console.log(`${result.winner} wins the game`);
                break;
            }
        }
    }

    printMove(result) {
        if (result.moved) {
            console.log(`${result.player} rolled a ${result.diceValue} and moved from ${result.fromPosition} to ${result.toPosition}`);
        } else {
            console.log(`${result.player} rolled a ${result.diceValue} but can't move from ${result.fromPosition}`);
        }
    }
}

// Run the game with sample input
const game = new SnakeAndLadderGame();
game.startGame(sampleInput);

// Uncomment for interactive mode
/*
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
let lineCount = 0;
let expectedLines = 0;

rl.on('line', (line) => {
    inputLines.push(line);
    
    if (lineCount === 0) {
        // First line is snake count
        expectedLines = parseInt(line) + 1;
    } else if (lineCount === expectedLines) {
        // Next line is ladder count
        expectedLines += parseInt(line) + 1;
    } else if (lineCount === expectedLines) {
        // Next line is player count
        expectedLines += parseInt(line);
    } else if (lineCount >= expectedLines) {
        // All input received
        rl.close();
    }
    
    lineCount++;
}).on('close', () => {
    const game = new SnakeAndLadderGame();
    game.startGame(inputLines.join('\n'));
    process.exit(0);
});
*/