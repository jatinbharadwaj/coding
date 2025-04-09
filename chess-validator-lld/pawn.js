const Piece = require('./piece');

class Pawn extends Piece {
    canMove(board, startPos, endPos) {
        const [startRow, startCol] = board.convertNotation(startPos);
        const [endRow, endCol] = board.convertNotation(endPos);
        const direction = this.color === 'W' ? -1 : 1;
        const targetPiece = board.grid[endRow][endCol];

        // Normal move forward
        if (startCol === endCol) {
            // One step forward
            if (endRow === startRow + direction && !targetPiece) return true;

            // Two steps forward on first move
            if ((this.color === 'W' && startRow === 6 || this.color === 'B' && startRow === 1) &&
                endRow === startRow + 2 * direction &&
                !targetPiece &&
                board.isPathClear(startPos, endPos)) {
                return true;
            }
        }

        // Capture move
        if (Math.abs(endCol - startCol) === 1 &&
            endRow === startRow + direction &&
            targetPiece && targetPiece.color !== this.color) {
            return true;
        }

        return false;
    }
}

module.exports = Pawn;