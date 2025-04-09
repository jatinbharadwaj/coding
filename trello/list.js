const Card = require('./card');

class List {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.cards = new Map();
    }

    addCard(id, name, description) {
        const card = new Card(id, name, description);
        this.cards.set(id, card);
        return card;
    }

    deleteCard(cardId) {
        return this.cards.delete(cardId);
    }

    clearCards() {
        this.cards.clear();
    }

    getCard(cardId) {
        return this.cards.get(cardId);
    }

    clone(newId) {
        const newList = new List(newId, `${this.name} (Copy)`);
        this.cards.forEach(card => {
            const newCardId = `${card.id}_copy`;
            newList.addCard(newCardId, card.name, card.description);
            if (card.assignedUser) {
                newList.getCard(newCardId).assignUser(card.assignedUser);
            }
            card.tags.forEach(tag => newList.getCard(newCardId).addTag(tag));
        });
        return newList;
    }

    toString(showCards = true) {
        let str = `List ID: ${this.id}\nName: ${this.name}\n`;
        if (showCards) {
            str += 'Cards:\n';
            this.cards.forEach(card => {
                str += `  - ${card.toString().replace(/\n/g, '\n    ')}\n`;
            });
        }
        return str;
    }
}

module.exports = List;