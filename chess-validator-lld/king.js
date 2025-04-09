const Piece = require('./piece');

class King extends Piece {
    canMove(board, startPos, endPos) {
        const [startRow, startCol] = board.convertNotation(startPos);
        const [endRow, endCol] = board.convertNotation(endPos);

        const rowDiff = Math.abs(endRow - startRow);
        const colDiff = Math.abs(endCol - startCol);

        // Can move one square in any direction
        return rowDiff <= 1 && colDiff <= 1;
    }
}

module.exports = King;