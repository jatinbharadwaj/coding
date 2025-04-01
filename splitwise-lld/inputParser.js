class InputParser {
    static parseExpense(input, expenseManager) {
        const parts = input.split(' ');
        const type = parts[0];

        if (type !== 'EXPENSE') return null;

        const paidBy = parts[1];
        const amount = parseFloat(parts[2]);
        const numUsers = parseInt(parts[3]);
        const users = parts.slice(4, 4 + numUsers).map(userId => expenseManager.users.get(userId));
        const expenseType = parts[4 + numUsers];
        const values = parts.slice(5 + numUsers).map(val => parseFloat(val));

        const payer = expenseManager.users.get(paidBy);
        if (!payer) throw new Error(`User ${paidBy} not found`);

        switch (expenseType) {
            case 'EQUAL':
                return Expense.createEqualExpense(payer, amount, users);
            case 'EXACT':
                if (values.reduce((sum, val) => sum + val, 0) !== amount) {
                    throw new Error('Exact shares don\'t sum to total amount');
                }
                return Expense.createExactExpense(payer, amount, users, values);
            case 'PERCENT':
                if (values.reduce((sum, val) => sum + val, 0) !== 100) {
                    throw new Error('Percentages don\'t sum to 100');
                }
                return Expense.createPercentExpense(payer, amount, users, values);
            case 'SHARE':
                return Expense.createShareExpense(payer, amount, users, values);
            default:
                throw new Error('Invalid expense type');
        }
    }
}

module.exports = InputParser;