
import sys
import os

# Add the project root to the python path to allow importing backend.app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from fastapi.testclient import TestClient
from backend.app.api.main import app

client = TestClient(app)

def test_initial_state_enforcement():
    # 1. Start a new game
    response = client.post("/new-game")
    assert response.status_code == 200
    data = response.json()
    
    # Check if next_board is (1, 1) - Center Board
    # Note: JSON serializes tuples as lists
    print(f"DEBUG: New Game Response: {data}")
    
    # Verify via /state endpoint
    state_response = client.get("/state")
    assert state_response.status_code == 200
    state = state_response.json()
    print(f"DEBUG: Initial State: {state.get('next_board')}")
    
    next_board = state.get("next_board")
    assert next_board == [1, 1], f"Expected next_board to be [1, 1], but got {next_board}"

    # 2. Try to make a move in a non-center board (e.g., 0, 0) -> Should Fail
    invalid_move = {
        "board_row": 0,
        "board_col": 0,
        "cell_row": 1,
        "cell_col": 1
    }
    move_response = client.post("/move", json=invalid_move)
    print(f"DEBUG: Invalid Move Response: {move_response.status_code} - {move_response.text}")
    assert move_response.status_code == 400, "Should reject move in restricted board"

    # 3. Try to make a move in the center board (1, 1) -> Should Succeed
    valid_move = {
        "board_row": 1,
        "board_col": 1,
        "cell_row": 1,
        "cell_col": 1  # Center cell of center board
    }
    move_response = client.post("/move", json=valid_move)
    print(f"DEBUG: Valid Move Response: {move_response.status_code}")
    assert move_response.status_code == 200, "Should accept move in center board"
    
    # Verify state after move
    new_state = move_response.json()
    # next_board should now target the board corresponding to the cell played (1, 1)
    assert new_state["next_board"] == [1, 1]

if __name__ == "__main__":
    try:
        test_initial_state_enforcement()
        print("✅ TEST PASSED: Initial move forced to center board (1,1)")
    except AssertionError as e:
        print(f"❌ TEST FAILED: {e}")
    except Exception as e:
        print(f"❌ ERROR: {e}")
