import React from 'react';
import type { GameState } from '../types/game';
import { SmallBoard } from './SmallBoard';

interface BigBoardProps {
    gameState: GameState;
    onMove: (br: number, bc: number, cr: number, cc: number) => void;
}

export const BigBoard: React.FC<BigBoardProps> = ({ gameState, onMove }) => {
    // Helper to check if a specific board is the valid target
    const isNextBoard = (r: number, c: number) => {
        if (!gameState.next_board) return true; // Open board rule (mostly, unless specific logic in state)
        // Wait, if next_board is null, it means open board rule OR game over.
        // But if game over, winner is set.
        // If not game over and next_board is null, any *valid* board is playable.
        // A valid board is one that is not full and not won.

        const [nr, nc] = gameState.next_board;
        return r === nr && c === nc;
    };

    const canPlayIn = (r: number, c: number, board: any) => {
        if (gameState.winner) return false;
        if (board.winner) return false;
        // Check if full? The SmallBoard component checks cell availability, but here we check board focus.

        if (gameState.next_board) {
            const [nr, nc] = gameState.next_board;
            return r === nr && c === nc;
        }

        // Open board rule: Can play in any board that isn't full/won
        // (Assuming backend sets next_board to null correctly).
        // Since we don't track is_full in frontend easily without iterating, let's assume if it's not won and next_board is null, it's potentially playable.
        // The SmallBoard will disable buttons if cells are full.
        return true;
    };

    return (
        <div className="grid grid-cols-3 gap-2 p-2 bg-gray-200 border-4 border-gray-900 shadow-xl">
            {gameState.board.map((row, rIdx) => (
                row.map((board, cIdx) => (
                    <SmallBoard
                        key={`${rIdx}-${cIdx}`}
                        boardState={board}
                        boardRow={rIdx}
                        boardCol={cIdx}
                        isValidTarget={canPlayIn(rIdx, cIdx, board)}
                        onCellClick={onMove}
                    />
                ))
            ))}
        </div>
    );
};
