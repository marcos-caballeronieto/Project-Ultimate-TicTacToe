from abc import ABC, abstractmethod
from typing import Tuple, Optional
from backend.app.core.game import UltimateTicTacToe

class BaseAgent(ABC):
    @abstractmethod
    def get_move(self, game: UltimateTicTacToe) -> Tuple[int, int, int, int]:
        """
        Returns a move as (board_row, board_col, cell_row, cell_col).
        """
        pass
