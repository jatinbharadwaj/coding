const List = require('./list');

class Board {
    constructor(id, name, privacy = 'PUBLIC') {
        this.id = id;
        this.name = name;
        this.privacy = privacy;
        this.url = `https://trello-clone.com/boards/${id}`;
        this.members = new Map();
        this.lists = new Map();
    }

    addMember(user) {
        this.members.set(user.id, user);
    }

    removeMember(userId) {
        this.members.delete(userId);
    }

    addList(id, name) {
        const list = new List(id, name);
        this.lists.set(id, list);
        return list;
    }

    deleteList(listId) {
        return this.lists.delete(listId);
    }

    moveCard(cardId, fromListId, toListId) {
        const fromList = this.lists.get(fromListId);
        const toList = this.lists.get(toListId);

        if (!fromList || !toList) return false;

        const card = fromList.getCard(cardId);
        if (!card) return false;

        fromList.deleteCard(cardId);
        toList.cards.set(cardId, card);
        return true;
    }

    toString(showDetails = true) {
        let str = `Board ID: ${this.id}\nName: ${this.name}\nPrivacy: ${this.privacy}\nURL: ${this.url}\n`;
        str += `Members: ${Array.from(this.members.values()).map(u => u.toString()).join(', ')}\n`;

        if (showDetails) {
            str += 'Lists:\n';
            this.lists.forEach(list => {
                str += `  - ${list.toString().replace(/\n/g, '\n    ')}\n`;
            });
        }

        return str;
    }
}

module.exports = Board;