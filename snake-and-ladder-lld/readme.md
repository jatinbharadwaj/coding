# Problem Statement

Create a Snake and Ladder application. The application should take the following inputs (from the command line or a file):

1. **Number of snakes (`s`)** followed by `s` lines, each containing 2 numbers denoting the head and tail positions of the snake.
2. **Number of ladders (`l`)** followed by `l` lines, each containing 2 numbers denoting the start and end positions of the ladder.
3. **Number of players (`p`)** followed by `p` lines, each containing a player's name.

After taking these inputs, the application should print all moves in the following format:

```
<player_name> rolled a <dice_value> and moved from <initial_position> to <final_position>
```

When a player wins the game, print:

```
<player_name> wins the game
```

---

## Rules of the Game

1. The board has 100 cells numbered from 1 to 100.
2. The game uses a six-sided die numbered from 1 to 6, which always gives a random number when rolled.
3. Each player has a piece initially placed outside the board (at position 0).
4. Players take turns rolling the die:
    - The piece moves forward by the number rolled. For example, if the die roll is 5 and the piece is at position 21, it moves to position 26 (21 + 5).
    - A player wins if their piece lands exactly on position 100. The game ends immediately.
    - If a move would take the piece beyond position 100, the piece does not move.
5. The board contains snakes and ladders:
    - **Snakes**: If a piece lands on the head of a snake, it moves down to the tail of the snake.
    - **Ladders**: If a piece lands on the start of a ladder, it moves up to the end of the ladder.
    - If a piece lands on a new snake or ladder after moving, it continues moving accordingly.
6. Additional assumptions:
    - There is no snake at position 100.
    - No two snakes or ladders share the same start/head position.
    - It is always possible to win the game.
    - Snakes and ladders do not form infinite loops.

---

## Sample Input

```
9
62 5
33 6
49 9
88 16
41 20
56 53
98 64
93 73
95 75
8
2 37
27 46
10 32
51 68
61 79
65 84
71 91
81 100
2
Gaurav
Sagar
```

---

## Sample Output

```
Gaurav rolled a 6 and moved from 0 to 6
Sagar rolled a 1 and moved from 0 to 1
Gaurav rolled a 6 and moved from 6 to 12
Sagar rolled a 4 and moved from 1 to 5
...
Sagar rolled a 3 and moved from 97 to 100
Sagar wins the game
```

---

## Expectations

1. Ensure the code is **functionally correct** and **demonstrable**.
2. Write **modular and readable code** with proper separation of concerns.
3. Avoid writing everything in a single file.
4. The code should be easily extendable for new requirements with minimal changes.
5. Include a **main method** for easy testing.
6. [Optional] Write unit tests if possible.
7. No need to create a GUI.

---

## Optional Requirements

These features are optional and can be implemented if time permits. The code should be designed to accommodate these with minimal changes:

1. Use two dice instead of one, making the total dice value range from 2 to 12.
2. Allow the board size to be customizable and taken as input before other inputs (snakes, ladders, players).
3. For more than two players, continue the game until only one player is left.
4. On rolling a 6:
    - The player gets another turn.
    - If a player rolls three consecutive 6s, all three rolls are canceled.
5. Generate snakes and ladders programmatically at the start of the application, adhering to the rules.

