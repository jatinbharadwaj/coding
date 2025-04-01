const ExpenseManager = require('./expenseManager');
const User = require('./user');
const InputParser = require('./inputParser');

class ExpenseSharingApp {
    constructor() {
        this.expenseManager = new ExpenseManager();
        this.initializeSampleUsers();
    }

    initializeSampleUsers() {
        const users = [
            new User('u1', 'User1', 'user1@example.com', '1234567890'),
            new User('u2', 'User2', 'user2@example.com', '2345678901'),
            new User('u3', 'User3', 'user3@example.com', '3456789012'),
            new User('u4', 'User4', 'user4@example.com', '4567890123')
        ];

        users.forEach(user => this.expenseManager.addUser(user));
    }

    processInput(input) {
        const command = input.split(' ')[0];

        try {
            switch (command) {
                case 'SHOW':
                    const userId = input.split(' ')[1];
                    const balances = userId
                        ? this.expenseManager.getBalances(userId)
                        : this.expenseManager.getBalances();

                    if (balances.length === 0) {
                        console.log('No balances');
                    } else {
                        balances.forEach(balance => console.log(balance));
                    }
                    break;

                case 'EXPENSE':
                    const expense = InputParser.parseExpense(input, this.expenseManager);
                    if (expense) {
                        this.expenseManager.addExpense(expense);
                    }
                    break;

                case 'SIMPLIFY':
                    this.expenseManager.simplifyBalances();
                    console.log('Balances simplified');
                    break;

                default:
                    console.log('Invalid command');
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

// Test the application with sample inputs
const app = new ExpenseSharingApp();

console.log('=== Sample Run ===');
app.processInput('SHOW');
app.processInput('SHOW u1');
app.processInput('EXPENSE u1 1000 4 u1 u2 u3 u4 EQUAL');
app.processInput('SHOW u4');
app.processInput('SHOW u1');
app.processInput('EXPENSE u1 1250 2 u2 u3 EXACT 370 880');
app.processInput('SHOW');
app.processInput('EXPENSE u4 1200 4 u1 u2 u3 u4 PERCENT 40 20 20 20');
app.processInput('SHOW u1');
app.processInput('SHOW');
app.processInput('SIMPLIFY');
app.processInput('SHOW');

// Interactive mode (uncomment to use)
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.on('line', (input) => {
//     if (input.toLowerCase() === 'exit') {
//         rl.close();
//     } else {
//         app.processInput(input);
//     }
// }).on('close', () => {
//     console.log('Exiting expense sharing app');
//     process.exit(0);
// });