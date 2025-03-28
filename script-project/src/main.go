package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"sort"
	"strconv"
	"sync"
)

type InitialState struct {
	Address string `json:"address"`
	Coin    string `json:"coin"`
	Balance string `json:"balance"`
}

type Transaction struct {
	From   string  `json:"from"`
	To     string  `json:"to"`
	Coin   string  `json:"coin"`
	Amount float64 `json:"amount"`
	Fee    float64 `json:"fee"`
	Value  float64 `json:"value"`
}

var (
	balances       = make(map[string]float64)
	maxTransactions = make(map[string]Transaction)
	transactions    []Transaction
	mu              sync.Mutex
)

func fetchData(url string, target interface{}) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	return json.NewDecoder(resp.Body).Decode(target)
}

func processData() error {
	initialStateURL := "https://www.jsonkeeper.com/b/ILH9"
	transactionsURL := "https://www.jsonkeeper.com/b/K4PX"

	var initialState struct {
		InitialState []InitialState `json:"initial_state"`
	}
	if err := fetchData(initialStateURL, &initialState); err != nil {
		return err
	}

	var txData struct {
		Transactions []Transaction `json:"transactions"`
	}
	if err := fetchData(transactionsURL, &txData); err != nil {
		return err
	}

	mu.Lock()
	defer mu.Unlock()

	// Process initial balances
	for _, state := range initialState.InitialState {
		key := state.Address + "_" + state.Coin
		balance, _ := strconv.ParseFloat(state.Balance, 64)
		balances[key] += balance
	}

	// Process transactions
	transactions = txData.Transactions
	for _, tx := range transactions {
		fromKey := tx.From + "_" + tx.Coin
		toKey := tx.To + "_" + tx.Coin

		balances[fromKey] -= tx.Amount + tx.Fee
		balances[toKey] += tx.Amount

		if maxTx, exists := maxTransactions[tx.Coin]; !exists || tx.Value > maxTx.Value {
			maxTransactions[tx.Coin] = tx
		}
	}

	return nil
}

func getCurrentBalance(w http.ResponseWriter, r *http.Request) {
	address := r.URL.Query().Get("address")
	coin := r.URL.Query().Get("coin")
	if address == "" || coin == "" {
		http.Error(w, "Missing 'address' or 'coin' query parameter.", http.StatusBadRequest)
		return
	}

	key := address + "_" + coin
	mu.Lock()
	balance := balances[key]
	mu.Unlock()

	json.NewEncoder(w).Encode(map[string]interface{}{
		"address": address,
		"coin":    coin,
		"balance": balance,
	})
}

func getMaxTransaction(w http.ResponseWriter, r *http.Request) {
	coin := r.URL.Query().Get("coin")
	if coin == "" {
		http.Error(w, "Missing 'coin' query parameter.", http.StatusBadRequest)
		return
	}

	mu.Lock()
	maxTx, exists := maxTransactions[coin]
	mu.Unlock()

	if !exists {
		http.Error(w, "No transactions found for the specified coin.", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(maxTx)
}

func getKthMaxTransaction(w http.ResponseWriter, r *http.Request) {
	coin := r.URL.Query().Get("coin")
	kStr := r.URL.Query().Get("k")
	if coin == "" || kStr == "" {
		http.Error(w, "Missing 'coin' or 'k' query parameter.", http.StatusBadRequest)
		return
	}

	k, err := strconv.Atoi(kStr)
	if err != nil || k <= 0 {
		http.Error(w, "'k' must be a positive integer.", http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	var coinTransactions []Transaction
	for _, tx := range transactions {
		if tx.Coin == coin {
			coinTransactions = append(coinTransactions, tx)
		}
	}

	if len(coinTransactions) < k {
		http.Error(w, "Not enough transactions found for the specified coin and k.", http.StatusNotFound)
		return
	}

	sort.Slice(coinTransactions, func(i, j int) bool {
		return coinTransactions[i].Amount > coinTransactions[j].Amount
	})

	json.NewEncoder(w).Encode(coinTransactions[k-1])
}

func main() {
	if err := processData(); err != nil {
		log.Fatalf("Failed to process data: %v", err)
	}

	http.HandleFunc("/get-current-balance", getCurrentBalance)
	http.HandleFunc("/get-max-transaction", getMaxTransaction)
	http.HandleFunc("/get-kth-max-transaction", getKthMaxTransaction)

	fmt.Printf("Server is running on http://localhost:3000\n")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
