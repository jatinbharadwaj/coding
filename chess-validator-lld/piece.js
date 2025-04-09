class Piece {
    constructor(color, position) {
        this.color = color;
        this.position = position;
    }

    isValidMove(board, startPos, endPos) {
        if (!board.isPositionValid(endPos)) return false;

        const [startRow, startCol] = board.convertNotation(startPos);
        const [endRow, endCol] = board.convertNotation(endPos);
        const targetPiece = board.grid[endRow][endCol];

        // Can't capture own piece
        if (targetPiece && targetPiece.color === this.color) return false;

        return this.canMove(board, startPos, endPos);
    }

    canMove(board, startPos, endPos) {
        throw new Error('Method must be implemented by subclass');
    }
}

module.exports = Piece;