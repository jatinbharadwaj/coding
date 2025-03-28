# Ginco Project (Go Version)

1. **Initial Balances (`current_state.json`)**: This dataset provides the current balance for several addresses across Bitcoin, 
Dogecoin, and TON. 

[initial-state.json](attachment:e8d1138f-04be-4b2a-a899-23731dfb801d:initial-state.json)
Transactions (transactions.json): This dataset contains 1,000 transactions for different addresses in the system.
1. getCurrentBalance(address,coin)
2. getMaxTransaction(coin)
3. getKthMaxTransaction(coin,k)
https://www.jsonkeeper.com/b/K4PX
https://www.jsonkeeper.com/b/ILH9


## Prerequisites

- Internet connection to fetch JSON data.

## Running the Project

1. Build and run the node application:
   ```bash
   go run src/ginco.js
   ```

2. The server will start on `http://localhost:3000`.

## API Endpoints

### 1. Get Current Balance

**Endpoint:** `/getCurrentBalance`  
**Method:** `GET`  
**Query Parameters:**
- `address` (string): The address to query.
- `coin` (string): The coin to query.

**Example Request:**
```bash
curl "http://localhost:3000/getCurrentBalance?address=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa&coin=BTC"
```

**Example Response:**
```json
{
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "coin": "BTC",
  "balance": 50.0
}
```

### 2. Get Max Transaction

**Endpoint:** `/getMaxTransaction`  
**Method:** `GET`  
**Query Parameters:**
- `coin` (string): The coin to query.

**Example Request:**
```bash
curl "http://localhost:3000/getMaxTransaction?coin=BTC"
```

**Example Response:**
```json
{
  "from": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "to": "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
  "coin": "BTC",
  "amount": 10.0
}
```

## Notes

- Ensure the URLs in the code (`initialStateUrl` and `transactionsUrl`) are accessible.
- Modify the port in the code if `3000` is already in use.

## License

This project is licensed under the MIT License.