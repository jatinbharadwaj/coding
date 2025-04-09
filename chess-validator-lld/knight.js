const Piece = require('./piece');

class Knight extends Piece {
    canMove(board, startPos, endPos) {
        const [startRow, startCol] = board.convertNotation(startPos);
        const [endRow, endCol] = board.convertNotation(endPos);

        const rowDiff = Math.abs(endRow - startRow);
        const colDiff = Math.abs(endCol - startCol);

        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }
}

module.exports = Knight;