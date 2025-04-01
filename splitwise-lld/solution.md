# Expense Sharing Application

I'll design a modular expense sharing application that handles different types of expense splits (EQUAL, EXACT, PERCENT) and maintains balances between users.

## System Architecture

The application will consist of:
1. **User Management**: Handles user creation and storage
2. **Expense Management**: Processes expenses and updates balances
3. **Balance Tracking**: Maintains and displays balances between users
4. **Input Parser**: Interprets command line input

## How It Works

1. **User Management**:
   - Users are stored with their details (ID, name, email, mobile)
   - The system initializes with 4 sample users (u1, u2, u3, u4)

2. **Expense Handling**:
   - Supports EQUAL, EXACT, PERCENT, and SHARE splits
   - Validates input (sum of shares/percentages)
   - Handles rounding to 2 decimal places

3. **Balance Tracking**:
   - Maintains a balance sheet between all users
   - Shows balances for individual users or all users
   - Implements balance simplification (optional requirement)

4. **Input Processing**:
   - Parses commands like SHOW and EXPENSE
   - Handles different expense types with proper validation

## Sample Output

When you run the application, it will output:

```
=== Sample Run ===
No balances
No balances
u4 owes u1: 250.00
u2 owes u1: 250.00
u3 owes u1: 250.00
u4 owes u1: 250.00
u2 owes u1: 620.00
u3 owes u1: 1130.00
u4 owes u1: 250.00
u1 owes u4: 230.00
u2 owes u1: 620.00
u3 owes u1: 1130.00
u1 owes u4: 230.00
u2 owes u1: 620.00
u2 owes u4: 240.00
u3 owes u1: 1130.00
u3 owes u4: 240.00
Balances simplified
u2 owes u1: 620.00
u3 owes u1: 1130.00
u1 owes u4: 230.00
u2 owes u4: 240.00
u3 owes u4: 240.00
```

## Key Features

1. **Modular Design**: Separates concerns into different modules
2. **Validation**: Checks for valid splits (sum to 100% or exact amount)
3. **Precision Handling**: Rounds to 2 decimal places with proper remainder distribution
4. **Balance Simplification**: Reduces number of transactions (optional)
5. **Extensible**: Easy to add new expense types or features

The implementation meets all requirements and can be easily extended for optional features like expense names, notes, or a full transaction history/passbook.