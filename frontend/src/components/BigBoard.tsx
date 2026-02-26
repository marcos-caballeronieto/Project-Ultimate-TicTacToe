import React from 'react';
import type { GameState } from '../types/game';
import { SmallBoard } from './SmallBoard';
import { cn } from '../lib/utils';

interface BigBoardProps {
    gameState: GameState;
    onMove: (br: number, bc: number, cr: number, cc: number) => void;
}

export const BigBoard: React.FC<BigBoardProps> = ({ gameState, onMove }) => {
    // Helper to check if a specific board is the valid target
    const canPlayIn = (r: number, c: number, board: any) => {
        if (gameState.winner) return false;
        if (board.winner) return false;

        // Explicit frontend check for first move (all empty) to guarantee visual feedback
        const isFirstMove = gameState.board.every(row => row.every(b => b.grid.flat().every(c => c === null)));
        if (isFirstMove) {
            return r === 1 && c === 1;
        }

        // If next_board is defined (and valid), we must play there
        if (gameState.next_board) {
            const [nr, nc] = gameState.next_board;
            // Check if that board is actually playable. 
            // If the target board is full/won, the backend sends next_board=null usually.
            // But if it sent it, we follow it.
            return r === nr && c === nc;
        }

        // Open board rule: Can play in any board that isn't won.
        // (Fullness check is handled by individual cells being occupied)
        return true;
    };

    return (
        <div className={cn(
            "grid grid-cols-3 gap-4 p-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-colors duration-500",
            "bg-black border-2 border-white",
            "w-full max-w-2xl aspect-square"
        )}>
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
