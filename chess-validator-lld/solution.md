System Architecture
### System Architecture

#### Board
Manages the chessboard and tracks the positions of all pieces.

#### Piece
An abstract base class representing all chess pieces.

#### Piece Types
Specific implementations for each chess piece (e.g., Pawn, Rook, Knight, etc.).

#### Player
Represents a player and their associated pieces.

#### Game
Handles the overall game flow, rules, and turn management.

#### Input Parser
Processes and validates user input for moves.

---

### How It Works

#### Initialization
- Sets up a new board with pieces in their standard starting positions.
- White player always moves first.

#### Move Validation
- Ensures the move is within the bounds of the board.
- Confirms the piece belongs to the current player.
- Validates movement rules specific to the piece type.
- Checks for clear paths for sliding pieces (e.g., rook, bishop, queen).

#### Game Flow
- Players alternate turns after each valid move.
- The board state is displayed after every valid move.
- Displays "Invalid Move" for any invalid attempt.

#### Piece Movement
- Each piece type implements its unique movement rules:
    - Pawns have special rules for their first move and capturing.
    - Sliding pieces (rook, bishop, queen) ensure paths are unobstructed.
    - Knights can jump over other pieces.

---

### Optional Features Implementation

The design is modular and supports easy extensions, such as:

#### Adding New Piece Types
- Create a new class inheriting from `Piece` and implement the `canMove` method.

#### Custom Movement Rules
- Modify the `canMove` method in the respective piece class.

#### Changing Board Size
- Adjust the initialization logic in the `Board` class.

#### Custom Starting Positions
- Update the `initializePieces` method in the `Board` class.

This modular approach ensures that changes can be made with minimal impact on other components.
