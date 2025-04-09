# Modular Tic Tac Toe Game Design

This document outlines the design of a modular Tic Tac Toe game that adheres to the specified rules and requirements. The implementation is divided into distinct components for better organization and maintainability.

## System Architecture

- **Game Board**: Manages the 3x3 grid and piece positions.
- **Player**: Represents each player with their name and symbol.
- **Game Engine**: Controls game flow and enforces rules.
- **Input Parser**: Processes and validates user moves.

## How It Works

### Initialization
1. Creates a 3x3 empty board.
2. Prompts for player names and assigns `X` and `O` symbols.
3. The player with the `X` symbol takes the first turn.

### Gameplay
1. Players take turns entering moves in the format `row col` (1-based indexing).
2. Validates each move:
    - Ensures the cell is empty.
    - Checks if the move is within bounds.
3. Updates the board after each valid move.
4. Checks for win conditions after every move.

### Win Conditions
- Checks all rows, columns, and diagonals for matching symbols.
- Declares a winner if a line is found.
- Declares a draw if the board is full and no winner exists.

### Input/Output
- Accepts moves in the format `row col`.
- Displays the board after each valid move.
- Handles invalid moves with appropriate feedback.

## Optional Features

The design is flexible and supports the following extensions:

### Variable Grid Size
- Modify the `Board` constructor to accept a size parameter.
- Update win condition checks to accommodate any grid size.

### Additional Players/Pieces
- Extend the `Player` class to support new symbols.
- Update the `Game Engine` to handle more players.
- Adjust win condition logic for multiple players.

### Different Piece Types
- Introduce a `Piece` class hierarchy.
- Define unique movement or placement rules for each piece type.
- Update the game logic to incorporate these rules.
