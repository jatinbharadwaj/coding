const Expense = require('./expense.js')
class InputParser {
    static parseExpense(input, expenseManager) {
        //console.log('Parsing input:', input);

        const parts = input.split(' ');
        const type = parts[0];
        //console.log('Expense type:', type);

        if (type !== 'EXPENSE') {
            //console.log('Input is not an EXPENSE type');
            return null;
        }

        const paidBy = parts[1];
        const amount = parseFloat(parts[2]);
        const numUsers = parseInt(parts[3]);
        //console.log('Paid by:', paidBy, 'Amount:', amount, 'Number of users:', numUsers);

        const users = parts.slice(4, 4 + numUsers).map(userId => {
            const user = expenseManager.users.get(userId);
            //console.log('User found:', userId, user);
            return user;
        });

        const expenseType = parts[4 + numUsers];
        const values = parts.slice(5 + numUsers).map(val => parseFloat(val));
        //console.log('Expense type:', expenseType, 'Values:', values);

        const payer = expenseManager.users.get(paidBy);
        if (!payer) {
            console.error(`User ${paidBy} not found`);
            throw new Error(`User ${paidBy} not found`);
        }

        switch (expenseType) {
            case 'EQUAL':
                //console.log('Creating EQUAL expense');
                return Expense.createEqualExpense(payer, amount, users);
            case 'EXACT':
                if (values.reduce((sum, val) => sum + val, 0) !== amount) {
                    console.error('Exact shares don\'t sum to total amount');
                    throw new Error('Exact shares don\'t sum to total amount');
                }
                //console.log('Creating EXACT expense');
                return Expense.createExactExpense(payer, amount, users, values);
            case 'PERCENT':
                if (values.reduce((sum, val) => sum + val, 0) !== 100) {
                    console.error('Percentages don\'t sum to 100');
                    throw new Error('Percentages don\'t sum to 100');
                }
                //console.log('Creating PERCENT expense');
                return Expense.createPercentExpense(payer, amount, users, values);
            case 'SHARE':
                //console.log('Creating SHARE expense');
                return Expense.createShareExpense(payer, amount, users, values);
            default:
                console.error('Invalid expense type');
                throw new Error('Invalid expense type');
        }
    }
}

module.exports = InputParser;