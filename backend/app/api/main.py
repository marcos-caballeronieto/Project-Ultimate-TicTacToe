from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Union
from backend.app.core.game import UltimateTicTacToe
from backend.app.agents.random_agent import RandomAgent
import os

app = FastAPI(title="Ultimate Tic-Tac-Toe API")

# Configure CORS
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS", 
    "http://localhost:5173,http://localhost:3000"
).split(",")

# Add current deployment URL to allowed origins
# For production, it's better to add specific domains or use a regex
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For now, allow all while we fix deployment. 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Ultimate Tic-Tac-Toe API is live"}

# Global Game State (For MVP - Single Game Only)
game_instance = UltimateTicTacToe()
agent = RandomAgent()
is_vs_ai = False

class MoveRequest(BaseModel):
    board_row: int
    board_col: int
    cell_row: int
    cell_col: int

@app.post("/new-game")
def new_game(vs_ai: bool = False):
    global game_instance, is_vs_ai
    import sys
    import backend.app.core.game
    print("Initializing new game...")
    game_instance = UltimateTicTacToe()
    print(f"New game initialized. Next board: {game_instance.next_board}")
    is_vs_ai = vs_ai
    return {
        "message": "New game started", 
        "vs_ai": is_vs_ai,
        "debug_next_board": game_instance.next_board,
        "debug_game_file": backend.app.core.game.__file__,
        "debug_sys_path": sys.path
    }

@app.get("/state")
def get_state():
    return game_instance.to_dict()

@app.post("/move")
def make_move(move: MoveRequest):
    global game_instance, is_vs_ai
    # Human Move
    success = game_instance.make_move(move.board_row, move.board_col, move.cell_row, move.cell_col)
    if not success:
        raise HTTPException(status_code=400, detail="Invalid move")
    
    # AI Move (if enabled and it's AI's turn)
    if is_vs_ai and game_instance.current_player == "O" and not game_instance.winner:
        try:
            ai_move = agent.get_move(game_instance)
            # board_row, board_col, cell_row, cell_col
            game_instance.make_move(ai_move[0], ai_move[1], ai_move[2], ai_move[3])
        except ValueError:
            pass # No valid moves or game ended
        
    return game_instance.to_dict()
