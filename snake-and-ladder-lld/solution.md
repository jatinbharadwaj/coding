# Snake and Ladder Game Implementation

I'll design a modular Snake and Ladder game that follows all the specified rules and requirements. The implementation will be divided into several components for better organization and maintainability.

## System Architecture

1. **Game Board**: Manages snakes, ladders, and player positions
2. **Player**: Represents each player with their current position
3. **Dice**: Handles dice rolling logic
4. **Game Engine**: Controls game flow and rules
5. **Input Parser**: Processes input data (snakes, ladders, players)

## How It Works

1. **Initialization**:
   - The board is created with snakes and ladders
   - Players are initialized at position 0

2. **Gameplay**:
   - Players take turns rolling the dice
   - The engine moves the player and checks for snakes/ladders
   - If a player reaches exactly 100, they win

3. **Rules Implementation**:
   - Basic movement with dice rolls
   - Snake and ladder effects
   - Winning condition
   - Optional rules (extra turns on 6, 3 consecutive sixes cancel out)

4. **Output**:
   - Prints each move with before/after positions
   - Announces the winner when game ends

## Optional Features Implementation

To implement the optional features, we can modify the code as follows:

1. **Two Dice**:
   - Change the Dice constructor to use 2 dice: `this.dice = new Dice(6, 2);`

2. **Custom Board Size**:
   - Modify the Board constructor to accept size parameter
   - Add input for board size before other inputs

3. **Multiple Players**:
   - The current implementation already supports multiple players
   - Game continues until one player reaches 100

4. **Consecutive Sixes Rule**:
   - Already implemented in the Player class
   - Tracks consecutive sixes and resets position if 3 occur

5. **Programmatic Board Creation**:
   - Add a method to generate random snakes and ladders that follow the rules

## Sample Output

When running with the sample input, the output will look like:

```
Gaurav rolled a 6 and moved from 0 to 6
Sagar rolled a 1 and moved from 0 to 1
Gaurav rolled a 6 and moved from 6 to 12
Sagar rolled a 4 and moved from 1 to 5
Gaurav rolled a 4 and moved from 12 to 16
Sagar rolled a 6 and moved from 5 to 11
...
Sagar rolled a 3 and moved from 97 to 100
Sagar wins the game
```

The implementation follows all the specified rules and provides a clear, modular structure that can be easily extended for additional features.