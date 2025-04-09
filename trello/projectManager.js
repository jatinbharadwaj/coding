const Board = require('./board');
const List = require('./list');
const Card = require('./card');
const User = require('./user');

class ProjectManager {
    constructor() {
        this.boards = new Map();
        this.users = new Map();
    }

    createBoard(name, privacy = 'PUBLIC') {
        const id = this.generateId();
        const board = new Board(id, name, privacy);
        this.boards.set(id, board);
        return board;
    }

    deleteBoard(boardId) {
        return this.boards.delete(boardId);
    }

    createList(boardId, name) {
        const board = this.boards.get(boardId);
        if (!board) return null;

        const id = this.generateId();
        return board.addList(id, name);
    }

    deleteList(boardId, listId) {
        const board = this.boards.get(boardId);
        if (!board) return false;
        return board.deleteList(listId);
    }

    createCard(boardId, listId, name, description = '') {
        const board = this.boards.get(boardId);
        if (!board) return null;

        const list = board.lists.get(listId);
        if (!list) return null;

        const id = this.generateId();
        return list.addCard(id, name, description);
    }

    deleteCard(boardId, listId, cardId) {
        const board = this.boards.get(boardId);
        if (!board) return false;

        const list = board.lists.get(listId);
        if (!list) return false;

        return list.deleteCard(cardId);
    }

    assignCard(boardId, listId, cardId, user) {
        const card = this.getCard(boardId, listId, cardId);
        if (!card) return false;

        card.assignUser(user);
        return true;
    }

    unassignCard(boardId, listId, cardId) {
        const card = this.getCard(boardId, listId, cardId);
        if (!card) return false;

        card.unassignUser();
        return true;
    }

    moveCard(boardId, fromListId, toListId, cardId) {
        const board = this.boards.get(boardId);
        if (!board) return false;

        return board.moveCard(cardId, fromListId, toListId);
    }

    addUser(id, name, email) {
        const user = new User(id, name, email);
        this.users.set(id, user);
        return user;
    }

    getUser(userId) {
        return this.users.get(userId);
    }

    addMemberToBoard(boardId, userId) {
        const board = this.boards.get(boardId);
        const user = this.users.get(userId);

        if (!board || !user) return false;

        board.addMember(user);
        return true;
    }

    removeMemberFromBoard(boardId, userId) {
        const board = this.boards.get(boardId);
        if (!board) return false;

        board.removeMember(userId);
        return true;
    }

    getCard(boardId, listId, cardId) {
        const board = this.boards.get(boardId);
        if (!board) return null;

        const list = board.lists.get(listId);
        if (!list) return null;

        return list.getCard(cardId);
    }

    cloneList(boardId, listId) {
        const board = this.boards.get(boardId);
        if (!board) return null;

        const list = board.lists.get(listId);
        if (!list) return null;

        const newListId = this.generateId();
        const newList = list.clone(newListId);
        board.lists.set(newListId, newList);
        return newList;
    }

    clearListCards(boardId, listId) {
        const board = this.boards.get(boardId);
        if (!board) return false;

        const list = board.lists.get(listId);
        if (!list) return false;

        list.clearCards();
        return true;
    }

    addTagToCard(boardId, listId, cardId, tag) {
        const card = this.getCard(boardId, listId, cardId);
        if (!card) return false;

        card.addTag(tag);
        return true;
    }

    removeTagFromCard(boardId, listId, cardId, tag) {
        const card = this.getCard(boardId, listId, cardId);
        if (!card) return false;

        card.removeTag(tag);
        return true;
    }

    getCardsByTag(boardId, tag) {
        const board = this.boards.get(boardId);
        if (!board) return [];

        const cards = [];
        board.lists.forEach(list => {
            list.cards.forEach(card => {
                if (card.tags.has(tag)) {
                    cards.push(card);
                }
            });
        });
        return cards;
    }

    getCardsByUser(userId) {
        const user = this.users.get(userId);
        if (!user) return [];

        const cards = [];
        this.boards.forEach(board => {
            board.lists.forEach(list => {
                list.cards.forEach(card => {
                    if (card.assignedUser && card.assignedUser.id === userId) {
                        cards.push({
                            board: board,
                            list: list,
                            card: card
                        });
                    }
                });
            });
        });
        return cards;
    }

    showAll() {
        if (this.boards.size === 0) return 'No boards';

        let output = '';
        this.boards.forEach(board => {
            output += board.toString() + '\n\n';
        });
        return output.trim();
    }

    showBoard(boardId) {
        const board = this.boards.get(boardId);
        if (!board) return 'Board not found';
        return board.toString();
    }

    showList(boardId, listId) {
        const board = this.boards.get(boardId);
        if (!board) return 'Board not found';

        const list = board.lists.get(listId);
        if (!list) return 'List not found';

        return list.toString();
    }

    showCard(boardId, listId, cardId) {
        const card = this.getCard(boardId, listId, cardId);
        if (!card) return 'Card not found';
        return card.toString();
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

module.exports = ProjectManager;