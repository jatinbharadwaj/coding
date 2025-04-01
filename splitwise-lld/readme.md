# Problem Statement

Create an expense sharing application.

An expense sharing application allows you to add your expenses and split them among different people. The app keeps track of balances between people, showing who owes how much to whom.

---

## Example

### Scenario 1: Splitting Equally
You live with 3 other friends:
- **You**: User1 (id: u1)
- **Flatmates**: User2 (u2), User3 (u3), User4 (u4)

This month's electricity bill was Rs. 1000. You paid the bill and want to split it equally among all 4 people.

**Input**:  
`u1 1000 4 u1 u2 u3 u4 EQUAL`

**Result**:  
For this transaction, everyone owes Rs. 250 to User1. The app updates the balances as follows:
- User2 owes User1: Rs. 250 (0 + 250)
- User3 owes User1: Rs. 250 (0 + 250)
- User4 owes User1: Rs. 250 (0 + 250)

---

### Scenario 2: Splitting Exactly
During the BBD sale on Flipkart, you buy items for User2 and User3. The total amount for each person is different.

**Input**:  
`u1 1250 2 u2 u3 EXACT 370 880`

**Result**:  
For this transaction:
- User2 owes Rs. 370 to User1.
- User3 owes Rs. 880 to User1.

The app updates the balances as follows:
- User2 owes User1: Rs. 620 (250 + 370)
- User3 owes User1: Rs. 1130 (250 + 880)
- User4 owes User1: Rs. 250 (250 + 0)

---

### Scenario 3: Splitting by Percentage
You go out with your flatmates and take your sibling along. User4 pays the bill, and everyone splits equally, but you owe for 2 people.

**Input**:  
`u4 1200 4 u1 u2 u3 u4 PERCENT 40 20 20 20`

**Result**:  
For this transaction:
- User1 owes Rs. 480 to User4.
- User2 owes Rs. 240 to User4.
- User3 owes Rs. 240 to User4.

The app updates the balances as follows:
- User1 owes User4: Rs. 230 (250 - 480)
- User2 owes User1: Rs. 620 (620 + 0)
- User2 owes User4: Rs. 240 (0 + 240)
- User3 owes User1: Rs. 1130 (1130 + 0)
- User3 owes User4: Rs. 240 (0 + 240)

---

## Requirements

### User
Each user should have:
- `userId`
- `name`
- `email`
- `mobile number`

### Expense
Expenses can be split in the following ways:
- **EQUAL**: Split equally among users.
- **EXACT**: Specify exact amounts for each user.
- **PERCENT**: Specify percentage shares for each user.

### Features
1. Users can:
    - Add any amount.
    - Select any type of expense.
    - Split with any of the available users.
2. The app should:
    - Verify if the total percentage in **PERCENT** equals 100.
    - Verify if the total amount in **EXACT** matches the total expense.
    - Show expenses for a single user or balances for all users.
    - Display balances only for users with non-zero balances.
    - Round amounts to two decimal places.

---

## Input and Output

### Input
1. Create a few users in your main method (no need to take input for this).
2. Three types of input:
    - **Add Expense**:  
      `EXPENSE <user-id-of-person-who-paid> <no-of-users> <space-separated-list-of-users> <EQUAL/EXACT/PERCENT> <space-separated-values-in-case-of-non-equal>`
    - **Show Balances for All**:  
      `SHOW`
    - **Show Balances for a Single User**:  
      `SHOW <user-id>`

### Output
1. For a single user, show all balances they are part of:  
    **Format**: `<user-id-of-x> owes <user-id-of-y>: <amount>`  
    If no balances exist, print: `No balances`.
2. If the user owes money, they’ll be `x`. Otherwise, they’ll be `y`.

---

## Sample Input and Output

### Input
```
SHOW  
SHOW u1  
EXPENSE u1 1000 4 u1 u2 u3 u4 EQUAL  
SHOW u4  
SHOW u1  
EXPENSE u1 1250 2 u2 u3 EXACT 370 880  
SHOW  
EXPENSE u4 1200 4 u1 u2 u3 u4 PERCENT 40 20 20 20  
SHOW u1  
SHOW  
```

### Output
```
No balances  
No balances  
User4 owes User1: 250  
User2 owes User1: 250  
User3 owes User1: 250  
User4 owes User1: 250  
User2 owes User1: 620  
User3 owes User1: 1130  
User4 owes User1: 250  
User1 owes User4: 230  
User2 owes User1: 620  
User3 owes User1: 1130  
User1 owes User4: 230  
User2 owes User1: 620  
User2 owes User4: 240  
User3 owes User1: 1130  
User3 owes User4: 240  
```

---

## Expectations

1. Ensure the code is:
    - **Working** and **demonstrable**.
    - **Functionally correct**.
    - Modular and readable.
    - Designed with **separation of concerns**.
2. Avoid writing everything in a single file.
3. Code should accommodate new requirements with minimal changes.
4. Include a main method for easy testing.
5. [Optional] Write unit tests if possible.
6. No need to create a GUI.

---

## Optional Requirements

1. Add an expense name, notes, or images while adding the expense.
2. Split by share (e.g., `u4 1200 4 u1 u2 u3 u4 SHARE 2 1 1 1`).
3. Show a passbook for a user, listing all transactions they were part of.
4. Simplify expenses (e.g., `User1 owes 250 to User2 and User2 owes 200 to User3` simplifies to `User1 owes 50 to User2 and 200 to User3`).