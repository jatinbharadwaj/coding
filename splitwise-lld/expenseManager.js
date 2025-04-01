const Expense = require('./expense');
const User = require('./user');

class ExpenseManager {
    constructor() {
        this.users = new Map();
        this.expenses = [];
        this.balances = new Map(); // Map<userId, Map<owedUserId, amount>>
    }

    addUser(user) {
        this.users.set(user.userId, user);
        this.balances.set(user.userId, new Map());
    }

    addExpense(expense) {
        this.expenses.push(expense);
        this.updateBalances(expense);
    }

    updateBalances(expense) {
        const paidBy = expense.paidBy;
        const paidByBalances = this.balances.get(paidBy);

        expense.splits.forEach(split => {
            if (split.user.userId === paidBy) return;

            const owedUserId = split.user.userId;
            const share = split.share;

            // Update payer's balance sheet
            const currentBalance = paidByBalances.get(owedUserId) || 0;
            paidByBalances.set(owedUserId, parseFloat((currentBalance + share).toFixed(2)));

            // Update owee's balance sheet
            const oweeBalances = this.balances.get(owedUserId);
            const currentOweeBalance = oweeBalances.get(paidBy) || 0;
            oweeBalances.set(paidBy, parseFloat((currentOweeBalance - share).toFixed(2)));
        });
    }

    getBalances(userId = null) {
        const result = [];

        if (userId) {
            const userBalances = this.balances.get(userId);
            if (!userBalances) return [];

            for (const [otherUserId, amount] of userBalances.entries()) {
                if (Math.abs(amount) > 0.01) { // Consider > 1 paisa as non-zero
                    if (amount > 0) {
                        result.push(`${otherUserId} owes ${userId}: ${amount.toFixed(2)}`);
                    } else {
                        result.push(`${userId} owes ${otherUserId}: ${Math.abs(amount).toFixed(2)}`);
                    }
                }
            }
        } else {
            const processedPairs = new Set();

            for (const [userId1, balances] of this.balances.entries()) {
                for (const [userId2, amount] of balances.entries()) {
                    const pairKey = [userId1, userId2].sort().join('-');

                    if (Math.abs(amount) > 0.01 && !processedPairs.has(pairKey)) {
                        processedPairs.add(pairKey);

                        const netAmount = this.calculateNetBalance(userId1, userId2);
                        if (netAmount > 0.01) {
                            result.push(`${userId2} owes ${userId1}: ${netAmount.toFixed(2)}`);
                        } else if (netAmount < -0.01) {
                            result.push(`${userId1} owes ${userId2}: ${Math.abs(netAmount).toFixed(2)}`);
                        }
                    }
                }
            }
        }

        return result;
    }

    calculateNetBalance(userId1, userId2) {
        const balance1 = this.balances.get(userId1).get(userId2) || 0;
        const balance2 = this.balances.get(userId2).get(userId1) || 0;
        return parseFloat((balance1 - balance2).toFixed(2));
    }

    simplifyBalances() {
        const balances = {};

        // Convert balances to simple object structure
        for (const [userId1, userBalances] of this.balances.entries()) {
            balances[userId1] = {};
            for (const [userId2, amount] of userBalances.entries()) {
                if (Math.abs(amount) > 0.01) {
                    balances[userId1][userId2] = amount;
                }
            }
        }

        // Simplify balances
        for (const user1 in balances) {
            for (const user2 in balances[user1]) {
                if (balances[user1][user2] > 0) {
                    for (const user3 in balances[user2]) {
                        if (balances[user2][user3] > 0) {
                            const minAmount = Math.min(balances[user1][user2], balances[user2][user3]);
                            balances[user1][user2] -= minAmount;
                            balances[user2][user3] -= minAmount;

                            if (!balances[user1][user3]) balances[user1][user3] = 0;
                            balances[user1][user3] += minAmount;
                        }
                    }
                }
            }
        }

        // Update the main balances structure
        for (const [userId, userBalances] of this.balances.entries()) {
            userBalances.clear();
        }

        for (const user1 in balances) {
            for (const user2 in balances[user1]) {
                if (Math.abs(balances[user1][user2]) > 0.01) {
                    this.balances.get(user1).set(user2, balances[user1][user2]);
                }
            }
        }
    }
}

module.exports = ExpenseManager;