const Piece = require('./piece');

class Queen extends Piece {
    canMove(board, startPos, endPos) {
        const [startRow, startCol] = board.convertNotation(startPos);
        const [endRow, endCol] = board.convertNotation(endPos);

        const rowDiff = Math.abs(endRow - startRow);
        const colDiff = Math.abs(endCol - startCol);

        // Must move in straight line or diagonally
        if (startRow !== endRow && startCol !== endCol && rowDiff !== colDiff) return false;

        return board.isPathClear(startPos, endPos);
    }
}

module.exports = Queen;