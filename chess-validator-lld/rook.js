const Piece = require('./piece');

class Rook extends Piece {
    canMove(board, startPos, endPos) {
        const [startRow, startCol] = board.convertNotation(startPos);
        const [endRow, endCol] = board.convertNotation(endPos);

        // Must move in straight line
        if (startRow !== endRow && startCol !== endCol) return false;

        return board.isPathClear(startPos, endPos);
    }
}

module.exports = Rook;