export type Player = 'X' | 'O' | null;

export interface SmallBoardState {
    grid: Player[][];
    winner: Player;
}

export interface GameState {
    board: SmallBoardState[][];
    current_player: 'X' | 'O';
    next_board: [number, number] | null; // Tuple [row, col] or null
    winner: Player;
}

// Helper types for props
export interface Move {
    board_row: number;
    board_col: number;
    cell_row: number;
    cell_col: number;
}
