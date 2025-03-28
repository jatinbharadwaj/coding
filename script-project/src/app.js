const axios = require('axios');
const express = require('express');

const app = express();
const port = 3000;

// URLs to fetch initial state and transactions data
const transactionsUrl = "https://www.jsonkeeper.com/b/K4PX";
const initialStateUrl = "https://www.jsonkeeper.com/b/ILH9";

// Main processing function
async function processData() {
    try {
        // Fetch the JSON data from the provided URLs
        const initialStateResponse = await axios.get(initialStateUrl);
        const transactionsResponse = await axios.get(transactionsUrl);
        
        const initialState = initialStateResponse.data.initial_state;
        const transactions = transactionsResponse.data.transactions;

        // Process initial balances
        const balances = {};
        // Create a key based on address and coin, and store the balance
        for (const state of initialState) {
            const key = `${state.address}_${state.coin}`;
            const balance = parseFloat(state.balance.split(" ")[0]);
            balances[key] = (balances[key] || 0) + balance;
        }

        // Process all transactions to update balances
        for (const tx of transactions) {
            const fromKey = `${tx.from}_${tx.coin}`;
            const toKey = `${tx.to}_${tx.coin}`;
            const amount = parseFloat(tx.amount);
            const fee = parseFloat(tx.fee);

            // Deduct the amount and fee from the sender's balance
            balances[fromKey] = (balances[fromKey] || 0) - amount - fee;

            // Add the amount to the receiver's balance
            balances[toKey] = (balances[toKey] || 0) + amount;
        }

        // Precompute the maximum transaction for each coin
        const maxTransactions = {};
        for (const tx of transactions) {
            const coin = tx.coin;
            const amount = parseFloat(tx.value);
            if (!maxTransactions[coin] || amount > maxTransactions[coin].value) {
                maxTransactions[coin] = tx;
            }
        }

        // Function to get the current balance of an address for a specific coin
        function getCurrentBalance(address, coin) {
            const key = `${address}_${coin}`;
            return balances[key] || 0;
        }

        // Function to get the maximum transaction for a specific coin
        function getMaxTransaction(coin) {
            return maxTransactions[coin] || null;
        }

        // MinHeap class to implement a priority queue
        class MinHeap {
            constructor() {
                this.heap = [];
            }

            size() {
                return this.heap.length;
            }

            // Add an element to the heap
            enqueue(element, priority) {
                this.heap.push({ element, priority });
                this._heapifyUp();
            }

            // Remove and return the smallest element from the heap
            dequeue() {
                if (this.size() === 1) return this.heap.pop();
                const root = this.heap[0];
                this.heap[0] = this.heap.pop();
                this._heapifyDown();
                return root;
            }

            // Get the smallest element without removing it
            front() {
                return this.heap[0];
            }

            // Maintain the heap property after adding an element
            _heapifyUp() {
                let index = this.size() - 1;
                while (index > 0) {
                    const parentIndex = Math.floor((index - 1) / 2);
                    if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
                    [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                    index = parentIndex;
                }
            }

            // Maintain the heap property after removing the root element
            _heapifyDown() {
                let index = 0;
                const length = this.size();
                while (true) {
                    const leftChildIndex = 2 * index + 1;
                    const rightChildIndex = 2 * index + 2;
                    let smallest = index;

                    if (leftChildIndex < length && this.heap[leftChildIndex].priority < this.heap[smallest].priority) {
                        smallest = leftChildIndex;
                    }
                    if (rightChildIndex < length && this.heap[rightChildIndex].priority < this.heap[smallest].priority) {
                        smallest = rightChildIndex;
                    }
                    if (smallest === index) break;
                    [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                    index = smallest;
                }
            }
        }

        // Function to get the kth largest transaction for a specific coin
        function getKthMaxTransaction(coin, k) {
            const coinTransactions = transactions.filter(tx => tx.coin === coin);
            if (coinTransactions.length < k) {
                return null; // Not enough transactions for the given k
            }

            const minHeap = new MinHeap();

            // Maintain a heap of size k with the largest transactions
            for (const tx of coinTransactions) {
                minHeap.enqueue(tx, parseFloat(tx.amount));
                if (minHeap.size() > k) {
                    minHeap.dequeue(); // Remove the smallest transaction
                }
            }

            return minHeap.front().element; // The kth largest transaction
        }

        // Start Express server and define API endpoints
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

        app.get('/get-kth-max-transaction', (req, res) => {
            const { coin, k } = req.query;
            if (!coin || !k) {
                return res.status(400).send("Missing 'coin' or 'k' query parameter.");
            }
            const kthMaxTransaction = getKthMaxTransaction(coin, parseInt(k, 10));
            if (!kthMaxTransaction) {
                return res.status(404).send("Not enough transactions found for the specified coin and k.");
            }
            res.json(kthMaxTransaction);
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

        return {
            getCurrentBalance,
            getMaxTransaction,
            getKthMaxTransaction,
            balances, // exposing balances for testing
            maxTransactions // exposing maxTransactions for testing
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
    })
    .catch(err => {
        console.error("Processing failed:", err);
    });