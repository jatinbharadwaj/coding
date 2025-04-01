class Dice {
    constructor(sides = 6, count = 1) {
        this.sides = sides;
        this.count = count;
    }

    roll() {
        let total = 0;
        for (let i = 0; i < this.count; i++) {
            total += Math.floor(Math.random() * this.sides) + 1;
        }
        return total;
    }
}

module.exports = Dice;