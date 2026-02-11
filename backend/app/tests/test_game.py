import pytest
from backend.app.core.game import UltimateTicTacToe

def test_initial_state():
    game = UltimateTicTacToe()
    assert game.current_player == "X"
    assert game.winner is None
    assert game.next_board is None
    # All boards should be empty
    for r in range(3):
        for c in range(3):
            assert game.board[r][c].winner is None
            assert not game.board[r][c].is_full()

def test_basic_move():
    game = UltimateTicTacToe()
    # X plays in board (1,1) at cell (0,0)
    success = game.make_move(1, 1, 0, 0)
    assert success is True
    assert game.board[1][1].grid[0][0] == "X"
    assert game.current_player == "O"
    assert game.next_board == (0, 0)

def test_invalid_move():
    game = UltimateTicTacToe()
    game.make_move(1, 1, 0, 0)
    # O tries to play in a different board than mandated (0,0)
    success = game.make_move(1, 1, 0, 0) # Should be invalid
    assert success is False
    # O plays in valid board
    success = game.make_move(0, 0, 1, 1)
    assert success is True

def test_local_win():
    game = UltimateTicTacToe()
    # X wins board (0,0)
    # Sequence to let X win (0,0)
    # X: (0,0) -> (0,1)
    # O: (0,1) -> (something)
    
    # Simpler: Just force state for testing local logic if possible, 
    # but better to use make_move to ensure state consistency
    
    moves = [
        (1, 1, 0, 0), # X to (0,0)
        (0, 0, 1, 1), # O sends X to (1,1)
        (1, 1, 0, 1), # X to (0,1)
        (0, 1, 1, 1), # O sends X to (1,1)
        (1, 1, 0, 2), # X to (0,2) - wins (1,1)
    ]
    
    for m in moves:
        game.make_move(*m)
        
    assert game.board[1][1].winner == "X"

def test_open_board_rule():
    game = UltimateTicTacToe()
    
    # Sequence to make X win board (0,0) and then force X to be sent back to it.
    
    moves = [
        (2, 2, 0, 0), # 1. X plays in (2,2) -> Sends O to (0,0)
        (0, 0, 0, 0), # 2. O plays in (0,0) at (0,0) -> Sends X to (0,0)
        (0, 0, 1, 0), # 3. X plays in (0,0) at (1,0) -> Sends O to (1,0)
        (1, 0, 0, 0), # 4. O plays in (1,0) at (0,0) -> Sends X to (0,0)
        (0, 0, 1, 1), # 5. X plays in (0,0) at (1,1) -> Sends O to (1,1)
        (1, 1, 0, 0), # 6. O plays in (1,1) at (0,0) -> Sends X to (0,0)
        (0, 0, 1, 2), # 7. X plays in (0,0) at (1,2) -> Sends O to (1,2). X WINS (0,0) (Row 1)
        (1, 2, 0, 0), # 8. O plays in (1,2) at (0,0) -> Sends X to (0,0).
    ]
    
    for m in moves:
        game.make_move(*m)
    
    assert game.board[0][0].winner == "X"
    
    # Now X is sent to (0,0), but (0,0) is WON.
    # So X should be able to play anywhere in a non-full/non-won board.
    # Board (2,2) is available.
    
    assert game.next_board is None # Depending on implementation this might be (0,0) but valid_moves handles it, OR it is None.
                                   # My implementation sets next_board to None if target is full/won per lines 105-106 of game.py
    
    # X tries to play in (2,2) -> Should be valid
    success = game.make_move(2, 2, 1, 1)
    assert success is True

def test_global_win():
    game = UltimateTicTacToe()
    # Force winners on boards to test global win check
    game.board[0][0].winner = "X"
    game.board[1][1].winner = "X"
    game.board[2][2].winner = "X"
    
    game.check_global_winner()
    assert game.winner == "X"
