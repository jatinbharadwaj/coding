const Piece = require('./piece');

class Bishop extends Piece {
    canMove(board, startPos, endPos) {
        const [startRow, startCol] = board.convertNotation(startPos);
        const [endRow, endCol] = board.convertNotation(endPos);

        // Must move diagonally
        if (Math.abs(endRow - startRow) !== Math.abs(endCol - startCol)) return false;

        return board.isPathClear(startPos, endPos);
    }
}

module.exports = Bishop;