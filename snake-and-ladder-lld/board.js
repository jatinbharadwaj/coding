class Board {
    constructor(size = 100) {
        this.size = size;
        this.snakes = new Map();
        this.ladders = new Map();
    }

    addSnake(head, tail) {
        if (head <= tail) {
            throw new Error('Snake head must be greater than tail');
        }
        this.snakes.set(head, tail);
    }

    addLadder(start, end) {
        if (start >= end) {
            throw new Error('Ladder start must be less than end');
        }
        this.ladders.set(start, end);
    }

    getNewPosition(position) {
        // Check for snakes first
        if (this.snakes.has(position)) {
            return this.snakes.get(position);
        }
        // Then check for ladders
        if (this.ladders.has(position)) {
            return this.ladders.get(position);
        }
        return position;
    }

    isWinningPosition(position) {
        return position === this.size;
    }
}

module.exports = Board;