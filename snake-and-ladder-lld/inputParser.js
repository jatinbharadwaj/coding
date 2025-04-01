class InputParser {
    static parseInput(input) {
        const lines = input.trim().split('\n');
        let index = 0;

        // Parse snakes
        const snakeCount = parseInt(lines[index++]);
        const snakes = [];
        for (let i = 0; i < snakeCount; i++) {
            const [head, tail] = lines[index++].split(' ').map(Number);
            snakes.push([head, tail]);
        }

        // Parse ladders
        const ladderCount = parseInt(lines[index++]);
        const ladders = [];
        for (let i = 0; i < ladderCount; i++) {
            const [start, end] = lines[index++].split(' ').map(Number);
            ladders.push([start, end]);
        }

        // Parse players
        const playerCount = parseInt(lines[index++]);
        const players = [];
        for (let i = 0; i < playerCount; i++) {
            players.push(lines[index++].trim());
        }

        return { snakes, ladders, players };
    }
}

module.exports = InputParser;