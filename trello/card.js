class Card {
    constructor(id, name, description = '', assignedUser = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.assignedUser = assignedUser;
        this.tags = new Set();
    }

    assignUser(user) {
        this.assignedUser = user;
    }

    unassignUser() {
        this.assignedUser = null;
    }

    addTag(tag) {
        this.tags.add(tag);
    }

    removeTag(tag) {
        this.tags.delete(tag);
    }

    toString() {
        let str = `Card ID: ${this.id}\nName: ${this.name}\nDescription: ${this.description}\n`;
        str += `Assigned To: ${this.assignedUser ? this.assignedUser.toString() : 'Unassigned'}\n`;
        str += `Tags: ${Array.from(this.tags).join(', ')}`;
        return str;
    }
}

module.exports = Card;