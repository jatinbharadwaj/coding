class Expense {
    constructor(paidBy, amount, splits) {
        this.paidBy = paidBy;
        this.amount = amount;
        this.splits = splits;
        this.createdAt = new Date();
    }

    static createEqualExpense(paidBy, amount, users) {
        const share = parseFloat((amount / users.length).toFixed(2));
        const remaining = parseFloat((amount - (share * users.length)).toFixed(2));

        const splits = users.map((user, index) => {
            let finalShare = share;
            if (index === 0 && remaining !== 0) {
                finalShare = parseFloat((share + remaining).toFixed(2));
            }
            return { user, share: finalShare };
        });

        return new Expense(paidBy, amount, splits);
    }

    static createExactExpense(paidBy, amount, users, shares) {
        const splits = users.map((user, index) => ({
            user,
            share: parseFloat(shares[index].toFixed(2))
        }));
        return new Expense(paidBy, amount, splits);
    }

    static createPercentExpense(paidBy, amount, users, percentages) {
        const splits = users.map((user, index) => ({
            user,
            share: parseFloat((amount * percentages[index] / 100).toFixed(2))
        }));
        return new Expense(paidBy, amount, splits);
    }

    static createShareExpense(paidBy, amount, users, shares) {
        const totalShares = shares.reduce((sum, val) => sum + val, 0);
        const splits = users.map((user, index) => ({
            user,
            share: parseFloat((amount * shares[index] / totalShares).toFixed(2))
        }));
        return new Expense(paidBy, amount, splits);
    }
}

module.exports = Expense;