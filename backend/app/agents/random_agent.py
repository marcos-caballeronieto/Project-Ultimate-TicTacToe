import random
from typing import Tuple
from backend.app.core.game import UltimateTicTacToe
from backend.app.agents.base import BaseAgent

class RandomAgent(BaseAgent):
    def get_move(self, game: UltimateTicTacToe) -> Tuple[int, int, int, int]:
        valid_moves = game.get_valid_moves()
        if not valid_moves:
            raise ValueError("No valid moves available")
        return random.choice(valid_moves)
