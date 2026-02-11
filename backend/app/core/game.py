from typing import List, Optional, Tuple, Literal

Player = Literal["X", "O"]
Cell = Optional[Player]

class SmallBoard:
    def __init__(self):
        self.grid: List[List[Cell]] = [[None for _ in range(3)] for _ in range(3)]
        self.winner: Optional[Player] = None

    def is_full(self) -> bool:
        return all(cell is not None for row in self.grid for cell in row)

    def check_winner(self) -> Optional[Player]:
        if self.winner:
            return self.winner
            
        # Rows and Columns
        for i in range(3):
            if self.grid[i][0] == self.grid[i][1] == self.grid[i][2] and self.grid[i][0] is not None:
                self.winner = self.grid[i][0]
                return self.winner
            if self.grid[0][i] == self.grid[1][i] == self.grid[2][i] and self.grid[0][i] is not None:
                self.winner = self.grid[0][i]
                return self.winner

        # Diagonals
        if self.grid[0][0] == self.grid[1][1] == self.grid[2][2] and self.grid[0][0] is not None:
            self.winner = self.grid[0][0]
            return self.winner
        if self.grid[0][2] == self.grid[1][1] == self.grid[2][0] and self.grid[0][2] is not None:
            self.winner = self.grid[0][2]
            return self.winner
            
        return None

    def to_dict(self) -> dict:
        return {
            "grid": self.grid,
            "winner": self.winner
        }


class UltimateTicTacToe:
    def __init__(self):
        self.board: List[List[SmallBoard]] = [[SmallBoard() for _ in range(3)] for _ in range(3)]
        self.current_player: Player = "X"
        self.next_board: Optional[Tuple[int, int]] = None  # (row, col) of the board where the next move must be
        self.winner: Optional[Player] = None

    def get_valid_moves(self) -> List[Tuple[int, int, int, int]]:
        """
        Returns a list of valid moves as (board_row, board_col, cell_row, cell_col).
        """
        if self.winner:
            return []

        valid_moves = []
        
        # If next_board is restricted and that board is not full/won, play there
        if self.next_board:
            br, bc = self.next_board
            target_board = self.board[br][bc]
            if not target_board.winner and not target_board.is_full():
                for r in range(3):
                    for c in range(3):
                        if target_board.grid[r][c] is None:
                            valid_moves.append((br, bc, r, c))
                return valid_moves
        
        # Open Board Rule: Play anywhere in any non-won/non-full board
        for br in range(3):
            for bc in range(3):
                target_board = self.board[br][bc]
                if not target_board.winner and not target_board.is_full():
                    for r in range(3):
                        for c in range(3):
                            if target_board.grid[r][c] is None:
                                valid_moves.append((br, bc, r, c))
                                
        return valid_moves

    def make_move(self, board_row: int, board_col: int, cell_row: int, cell_col: int) -> bool:
        if self.winner:
            return False

        # Validate move
        valid_moves = self.get_valid_moves()
        if (board_row, board_col, cell_row, cell_col) not in valid_moves:
            return False

        # Execute move
        target_board = self.board[board_row][board_col]
        target_board.grid[cell_row][cell_col] = self.current_player
        
        # Check for local win
        target_board.check_winner()
        
        # Check for global win
        self.check_global_winner()
        
        # Determine next board restrictions
        next_target = self.board[cell_row][cell_col]
        if next_target.winner or next_target.is_full():
            self.next_board = None # Open board rule
        else:
            self.next_board = (cell_row, cell_col)
            
        # Switch player
        self.current_player = "O" if self.current_player == "X" else "X"
        return True

    def check_global_winner(self) -> Optional[Player]:
        if self.winner:
            return self.winner
            
        # Map local winners to a 3x3 grid
        winners_grid = [[self.board[r][c].winner for c in range(3)] for r in range(3)]
        
        # Check standard Tic-Tac-Toe win on this grid
        # Rows and Columns
        for i in range(3):
            if winners_grid[i][0] == winners_grid[i][1] == winners_grid[i][2] and winners_grid[i][0] is not None:
                self.winner = winners_grid[i][0]
                return self.winner
            if winners_grid[0][i] == winners_grid[1][i] == winners_grid[2][i] and winners_grid[0][i] is not None:
                self.winner = winners_grid[0][i]
                return self.winner

        # Diagonals
        if winners_grid[0][0] == winners_grid[1][1] == winners_grid[2][2] and winners_grid[0][0] is not None:
            self.winner = winners_grid[0][0]
            return self.winner
        if winners_grid[0][2] == winners_grid[1][1] == winners_grid[2][0] and winners_grid[0][2] is not None:
            self.winner = winners_grid[0][2]
            return self.winner
            
        return None

    def to_dict(self) -> dict:
        return {
            "board": [[sb.to_dict() for sb in row] for row in self.board],
            "current_player": self.current_player,
            "next_board": self.next_board,
            "winner": self.winner
        }

