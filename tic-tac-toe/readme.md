# Tic Tac Toe Game Design

This document outlines the design and implementation of a modular Tic Tac Toe game. The game adheres to the specified rules and requirements, with a focus on organization, maintainability, and extensibility.

## System Architecture

The implementation is divided into the following components:

1. **Game Board**: Manages the 3x3 grid and piece positions.
2. **Player**: Represents each player with their name and symbol.
3. **Game Engine**: Controls the game flow and enforces rules.
4. **Input Parser**: Processes user moves.

---

## Problem Statement

Tic Tac Toe is a two-player strategy game played on a 3x3 grid. The game begins with an empty grid of 9 cells. Players take turns placing their pieces ('X' or 'O') on the grid, with the goal of forming a horizontal, vertical, or diagonal sequence.

### Game Rules

1. The game is played between two players:
    - One player uses 'X'.
    - The other player uses 'O'.
2. The player with 'X' always makes the first move.
3. Players alternate turns.
4. The first player to form a horizontal, vertical, or diagonal sequence wins.
5. If no valid moves remain and no player has won, the game ends in a draw.

---

## Requirements

Create a command-line application for Tic Tac Toe with the following features:

1. **Player Setup**:
    - Prompt the user to enter the names of the two players.

2. **Game Initialization**:
    - Print the initial empty grid:
      ```
      - - -
      - - -
      - - -
      ```

3. **Gameplay**:
    - Allow players to make moves by entering the cell position (row and column numbers separated by a space).
    - Validate each move:
      - The move must correspond to the current player's piece.
      - The selected cell must be empty.
    - If the move is invalid:
      - Print `Invalid Move`.
      - Allow the same player to try again.
    - If the move is valid:
      - Place the piece on the grid.
      - Print the updated grid.

4. **Game End**:
    - Determine if a player has won or if no valid moves remain.
    - If a player wins, print: `Player_Name won the game`.
    - If no valid moves remain, print: `Game Over`.
    - Ignore all moves after the game ends.

5. **Input/Output Format**:
    - Input: Multiple lines with each line containing the cell position (e.g., `2 2`). Stop taking input when the word `exit` is encountered.
    - Output: Print the grid after each valid move. For invalid moves, print `Invalid Move`.

---

## Examples

### Example 1

#### Input:
```
X Gaurav
O Sagar
2 2
1 3
1 1
1 2
2 2
3 3
exit
```

#### Output:
```
- - -
- - -
- - -
- - -
- X -
- - -
- - O
- X -
- - -
X - O
- X -
- - -
X O O
- X -
- - -
Invalid Move
X O O
- X -
- - X
Gaurav won the game
```

---

### Example 2

#### Input:
```
X Gaurav
O Sagar
2 3
1 2
2 2
2 1
1 1
3 3
3 2
3 1
1 3
exit
```

#### Output:
```
- - -
- - -
- - -
- - -
- - X
- - -
- O -
- - X
- - -
- O -
- X X
- - -
- O -
O X X
- - -
X O -
O X X
- - -
X O -
O X X
- - O
X O -
O X X
- X O
X O X
O X X
O X O
Game Over
```

---

### Example 3

#### Input:
```
X Gaurav
O Sagar
exit
```

#### Output:
```
- - -
- - -
- - -
```

---

## Expectations

- Ensure the code is functional and demonstrable.
- Maintain modularity and readability.
- Address separation of concerns by dividing functionality into distinct components.
- Avoid writing everything in a single file (if not coding in C/C++).
- Design the code to accommodate new requirements with minimal changes.
- Include a main method for easy testing.
- [Optional] Write unit tests if possible.

---

## Optional Requirements

1. Extend the code to support different grid sizes.
2. Allow customization of piece types.
3. Enable more than two players or piece types.
