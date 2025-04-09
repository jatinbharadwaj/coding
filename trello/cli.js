const readline = require('readline');
const ProjectManager = require('./projectManager');

class CLI {
    constructor() {
        this.manager = new ProjectManager();
        this.initializeSampleData();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    initializeSampleData() {
        // Add some sample users
        this.manager.addUser('user1', 'Gaurav Chandak', 'gaurav@workat.tech');
        this.manager.addUser('user2', 'Sagar Jain', 'sagar@workat.tech');
        this.manager.addUser('user3', 'Prateek Narang', 'prateek@workat.tech');
    }

    start() {
        console.log('Trello-like Project Management System');
        console.log('Type "help" for available commands\n');

        this.rl.on('line', (input) => {
            if (input.toLowerCase() === 'exit') {
                this.rl.close();
                return;
            }

            if (input.toLowerCase() === 'help') {
                this.showHelp();
                return;
            }

            const [command, ...args] = input.split(' ');
            let result;

            try {
                switch (command.toUpperCase()) {
                    case 'BOARD':
                        result = this.handleBoardCommand(args);
                        break;
                    case 'LIST':
                        result = this.handleListCommand(args);
                        break;
                    case 'CARD':
                        result = this.handleCardCommand(args);
                        break;
                    case 'SHOW':
                        result = this.handleShowCommand(args);
                        break;
                    case 'USER':
                        result = this.handleUserCommand(args);
                        break;
                    default:
                        result = 'Invalid command. Type "help" for available commands.';
                }
                console.log(result || '');
            } catch (error) {
                console.log('Error:', error.message);
            }
        });

        this.rl.on('close', () => {
            process.exit(0);
        });
    }

    showHelp() {
        const helpText = `
Available Commands:

BOARD CREATE <name> [PRIVATE/PUBLIC]
BOARD <id> <name/privacy> <value>
BOARD <id> ADD_MEMBER <userId>
BOARD <id> REMOVE_MEMBER <userId>
BOARD DELETE <id>

LIST CREATE <boardId> <name>
LIST <id> <name/description> <value>
LIST DELETE <boardId> <listId>

CARD CREATE <boardId> <listId> <name> [description]
CARD <boardId> <listId> <cardId> <name/description> <value>
CARD <boardId> <listId> <cardId> ASSIGN <userId>
CARD <boardId> <listId> <cardId> UNASSIGN
CARD <boardId> <listId> <cardId> MOVE <toListId>
CARD <boardId> <listId> <cardId> ADD_TAG <tag>
CARD <boardId> <listId> <cardId> REMOVE_TAG <tag>
CARD DELETE <boardId> <listId> <cardId>

SHOW
SHOW BOARD <id>
SHOW LIST <boardId> <listId>
SHOW CARD <boardId> <listId> <cardId>
SHOW CARDS_BY_USER <userId>
SHOW CARDS_BY_TAG <boardId> <tag>

USER CREATE <id> <name> <email>

exit - To exit the program
`;
        console.log(helpText);
    }

    handleBoardCommand(args) {
        const subCommand = args[0]?.toUpperCase();

        if (subCommand === 'CREATE') {
            const name = args[1];
            const privacy = args[2] || 'PUBLIC';
            const board = this.manager.createBoard(name, privacy);
            return `Created board: ${board.id}`;
        }

        if (subCommand === 'DELETE') {
            const boardId = args[1];
            const success = this.manager.deleteBoard(boardId);
            return success ? `Deleted board: ${boardId}` : 'Board not found';
        }

        const boardId = args[0];
        const operation = args[1]?.toUpperCase();

        if (operation === 'ADD_MEMBER') {
            const userId = args[2];
            const success = this.manager.addMemberToBoard(boardId, userId);
            return success ? `Added member ${userId} to board` : 'Failed to add member';
        }

        if (operation === 'REMOVE_MEMBER') {
            const userId = args[2];
            const success = this.manager.removeMemberFromBoard(boardId, userId);
            return success ? `Removed member ${userId} from board` : 'Failed to remove member';
        }

        if (operation === 'NAME') {
            const name = args.slice(2).join(' ');
            const board = this.manager.boards.get(boardId);
            if (!board) return 'Board not found';
            board.name = name;
            return `Updated board name to: ${name}`;
        }

        if (operation === 'PRIVACY') {
            const privacy = args[2];
            const board = this.manager.boards.get(boardId);
            if (!board) return 'Board not found';
            board.privacy = privacy;
            return `Updated board privacy to: ${privacy}`;
        }

        return 'Invalid BOARD command';
    }

    handleListCommand(args) {
        const subCommand = args[0]?.toUpperCase();

        if (subCommand === 'CREATE') {
            const boardId = args[1];
            const name = args.slice(2).join(' ');
            const list = this.manager.createList(boardId, name);
            return list ? `Created list: ${list.id}` : 'Failed to create list';
        }

        if (subCommand === 'DELETE') {
            const boardId = args[1];
            const listId = args[2];
            const success = this.manager.deleteList(boardId, listId);
            return success ? `Deleted list: ${listId}` : 'Failed to delete list';
        }

        const listId = args[0];
        const operation = args[1]?.toLowerCase();

        if (operation === 'name') {
            const name = args.slice(2).join(' ');
            // Would need to find which board this list belongs to
            // This shows a limitation in our current design
            // For simplicity, we'll search all boards
            let listFound = false;
            this.manager.boards.forEach(board => {
                const list = board.lists.get(listId);
                if (list) {
                    list.name = name;
                    listFound = true;
                }
            });
            return listFound ? `Updated list name to: ${name}` : 'List not found';
        }

        return 'Invalid LIST command';
    }

    handleCardCommand(args) {
        const boardId = args[0];
        const listId = args[1];
        const cardId = args[2];
        const operation = args[3]?.toUpperCase();

        if (operation === 'CREATE') {
            const name = args.slice(4).join(' ');
            const card = this.manager.createCard(boardId, listId, name);
            return card ? `Created card: ${card.id}` : 'Failed to create card';
        }

        if (operation === 'DELETE') {
            const success = this.manager.deleteCard(boardId, listId, cardId);
            return success ? `Deleted card: ${cardId}` : 'Failed to delete card';
        }

        if (operation === 'ASSIGN') {
            const userId = args[4];
            const user = this.manager.getUser(userId);
            if (!user) return 'User not found';

            const success = this.manager.assignCard(boardId, listId, cardId, user);
            return success ? `Assigned card to ${user.name}` : 'Failed to assign card';
        }

        if (operation === 'UNASSIGN') {
            const success = this.manager.unassignCard(boardId, listId, cardId);
            return success ? 'Unassigned card' : 'Failed to unassign card';
        }

        if (operation === 'MOVE') {
            const toListId = args[4];
            const success = this.manager.moveCard(boardId, listId, toListId, cardId);
            return success ? `Moved card to list ${toListId}` : 'Failed to move card';
        }

        if (operation === 'ADD_TAG') {
            const tag = args[4];
            const success = this.manager.addTagToCard(boardId, listId, cardId, tag);
            return success ? `Added tag "${tag}" to card` : 'Failed to add tag';
        }

        if (operation === 'REMOVE_TAG') {
            const tag = args[4];
            const success = this.manager.removeTagFromCard(boardId, listId, cardId, tag);
            return success ? `Removed tag "${tag}" from card` : 'Failed to remove tag';
        }

        if (operation === 'NAME') {
            const name = args.slice(4).join(' ');
            const card = this.manager.getCard(boardId, listId, cardId);
            if (!card) return 'Card not found';
            card.name = name;
            return `Updated card name to: ${name}`;
        }

        if (operation === 'DESCRIPTION') {
            const description = args.slice(4).join(' ');
            const card = this.manager.getCard(boardId, listId, cardId);
            if (!card) return 'Card not found';
            card.description = description;
            return `Updated card description to: ${description}`;
        }

        return 'Invalid CARD command';
    }

    handleShowCommand(args) {
        const subCommand = args[0]?.toUpperCase();

        if (!subCommand || subCommand === 'ALL') {
            return this.manager.showAll();
        }

        if (subCommand === 'BOARD') {
            const boardId = args[1];
            return this.manager.showBoard(boardId);
        }

        if (subCommand === 'LIST') {
            const boardId = args[1];
            const listId = args[2];
            return this.manager.showList(boardId, listId);
        }

        if (subCommand === 'CARD') {
            const boardId = args[1];
            const listId = args[2];
            const cardId = args[3];
            return this.manager.showCard(boardId, listId, cardId);
        }

        if (subCommand === 'CARDS_BY_USER') {
            const userId = args[1];
            const cards = this.manager.getCardsByUser(userId);
            if (cards.length === 0) return 'No cards found for this user';

            return cards.map(({ board, list, card }) => {
                return `Board: ${board.name}\nList: ${list.name}\n${card.toString()}\n`;
            }).join('\n');
        }

        if (subCommand === 'CARDS_BY_TAG') {
            const boardId = args[1];
            const tag = args[2];
            const cards = this.manager.getCardsByTag(boardId, tag);
            if (cards.length === 0) return 'No cards found with this tag';

            return cards.map(card => card.toString()).join('\n\n');
        }

        return 'Invalid SHOW command';
    }

    handleUserCommand(args) {
        const subCommand = args[0]?.toUpperCase();

        if (subCommand === 'CREATE') {
            const id = args[1];
            const name = args[2];
            const email = args[3];
            const user = this.manager.addUser(id, name, email);
            return `Created user: ${user.id}`;
        }

        return 'Invalid USER command';
    }
}

module.exports = CLI;