import React from 'react';
import type { SmallBoardState } from '../types/game';
import { Cell } from './Cell';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface SmallBoardProps {
    boardState: SmallBoardState;
    boardRow: number;
    boardCol: number;
    isValidTarget: boolean; // If this board matches next_board or open rule
    onCellClick: (br: number, bc: number, cr: number, cc: number) => void;
}

export const SmallBoard: React.FC<SmallBoardProps> = ({
    boardState, boardRow, boardCol, isValidTarget, onCellClick
}) => {
    // Determine background/border based on validity and winner
    const isWinnerX = boardState.winner === "X";
    const isWinnerO = boardState.winner === "O";
    const isActive = !boardState.winner && isValidTarget;

    return (
        <div className={cn(
            "relative p-1 gap-1 grid grid-cols-3 grid-rows-3 rounded-lg transition-all duration-300",
            "bg-zinc-900 border-2 aspect-square",
            // Border colors
            isActive ? "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)] ring-1 ring-yellow-400" : "border-zinc-800",
            isWinnerX && "border-cyan-400/50 bg-cyan-950/10",
            isWinnerO && "border-fuchsia-400/50 bg-fuchsia-950/10",
        )}>
            {boardState.grid.map((row, rIdx) => (
                row.map((cell, cIdx) => (
                    <Cell
                        key={`${rIdx}-${cIdx}`}
                        value={cell as 'X' | 'O' | null}
                        onClick={() => {
                            if (!cell && isActive) {
                                onCellClick(boardRow, boardCol, rIdx, cIdx);
                            }
                        }}
                        disabled={!!cell || !!boardState.winner || !isActive}
                        isValidMove={isActive && !cell}
                    />
                ))
            ))}

            {/* Winner Overlay */}
            {boardState.winner && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-zinc-950/60 rounded-lg backdrop-blur-[1px] z-10"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className={cn(
                            "text-8xl font-display font-bold select-none drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]",
                            isWinnerX ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.5)]"
                        )}
                    >
                        {boardState.winner}
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};
