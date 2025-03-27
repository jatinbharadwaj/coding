// filepath: /ginco-project/ginco-project/src/ginco.js
const axios = require('axios');
const express = require('express');

const app = express();
const port = 3000;

// Load the data from the provided URLs
const transactionsUrl = "https://www.jsonkeeper.com/b/K4PX";
const initialStateUrl = "https://www.jsonkeeper.com/b/ILH9";
// Main processing function
async function processData() {
    try {
        // Fetch the JSON data
        const initialStateResponse = await axios.get(initialStateUrl);
        const transactionsResponse = await axios.get(transactionsUrl);
        
        const initialState = initialStateResponse.data.initial_state;
        const transactions = transactionsResponse.data.transactions;

        // Process initial balances
        const balances = {};
        for (const state of initialState) {
            if (!balances[`${state.address}_${state.coin}`]) {
                balances[`${state.address}_${state.coin}`] = parseFloat(state.balance.split(" ")[0]);
            } else {
                balances[`${state.address}_${state.coin}`] += parseFloat(state.balance.split(" ")[0]);
            }
        }

        // Process all transactions to update balances
        for (const tx of transactions) {
            const fromAddress = tx.from;
            const toAddress = tx.to;
            const coin = tx.coin;
            const amount = parseFloat(tx.amount);
            const fee = parseFloat(tx.fee);
            
            const balanceFromkey = `${fromAddress}_${coin}`;
            const balanceTokey = `${toAddress}_${coin}`;

            if (balanceFromkey) {
                if (!balances[balanceFromkey]) {
                    balances[balanceFromkey] = 0;
                }
                balances[balanceFromkey] = balances[balanceFromkey] - amount;
            }
            
            if (balanceTokey) {
                if (!balances[toAddress]) {
                    balances[balanceTokey] = 0;
                }
                balances[balanceTokey] = balances[balanceTokey] + amount;
            }

            balances[balanceFromkey] -= fee;
        }

        // Implement the required functions
        function getCurrentBalance(address, coin) {
            const key = `${address}_${coin}`
            return balances[key] || 0;
        }

        function getMaxTransaction(coin) {
            let maxTx = null;
            let maxAmount = 0;
            
            for (const tx of transactions){
                if (tx.coin == coin) {
                    console.log(tx.coin, coin, tx.value)
                    const amount = parseFloat(tx.value);
                    if (amount > maxAmount) {
                        maxAmount = amount;
                        maxTx = tx;
                    }
                }
            } 
            
            
            return maxTx;
        }

        // Start Express server
        app.get('/get-current-balance', (req, res) => {
            const { address, coin } = req.query;
            if (!address || !coin) {
                return res.status(400).send("Missing 'address' or 'coin' query parameter.");
            }
            const balance = getCurrentBalance(address, coin);
            res.json({ address, coin, balance });
        });

        app.get('/get-max-transaction', (req, res) => {
            const { coin } = req.query;
            if (!coin) {
                return res.status(400).send("Missing 'coin' query parameter.");
            }
            const maxTransaction = getMaxTransaction(coin);
            res.json(maxTransaction || { message: "No transactions found for the specified coin." });
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

        return {
            getCurrentBalance,
            getMaxTransaction,
            balances // exposing balances for testing
        };

    } catch (error) {
        console.error("Error processing data:", error);
        throw error;
    }
}

// Execute the processing
processData()
    .then(result => {
        console.log("\nProcessing completed successfully");
        // You can use result.getCurrentBalance() and result.getMaxTransaction() here
    })
    .catch(err => {
        console.error("Processing failed:", err);
    });