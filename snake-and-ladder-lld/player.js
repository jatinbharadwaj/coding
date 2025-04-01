class Player {
    constructor(name) {
        this.name = name;
        this.position = 0;
        this.consecutiveSixes = 0;
    }

    move(steps, board) {
        const newPosition = this.position + steps;

        // Don't move if it would exceed the board size
        if (newPosition > board.size) {
            return { moved: false, newPosition: this.position };
        }

        this.position = newPosition;
        const finalPosition = board.getNewPosition(this.position);
        const moved = finalPosition !== this.position;
        this.position = finalPosition;

        // Track consecutive sixes for optional rule
        if (steps === 6) {
            this.consecutiveSixes++;
        } else {
            this.consecutiveSixes = 0;
        }

        return { moved: true, newPosition: this.position };
    }

    resetConsecutiveSixes() {
        this.consecutiveSixes = 0;
    }
}

module.exports = Player;