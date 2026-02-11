import React from 'react';
import type { SmallBoardState } from '../types/game';

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
    // Determine background color based on validity and winner
    let bgColor = "bg-white";
    if (boardState.winner === "X") bgColor = "bg-red-100";
    if (boardState.winner === "O") bgColor = "bg-blue-100";
    if (!boardState.winner && isValidTarget) bgColor = "bg-yellow-50";

    // Overlay if won
    const showOverlay = !!boardState.winner;

    return (
        <div className={`relative p-1 gap-1 grid grid-cols-3 grid-rows-3 border-2 ${isValidTarget && !boardState.winner ? 'border-yellow-400 shadow-md' : 'border-gray-800'} ${bgColor}`}>
            {boardState.grid.map((row, rIdx) => (
                row.map((cell, cIdx) => (
                    <button
                        key={`${rIdx}-${cIdx}`}
                        className={`
                            h-8 w-8 flex items-center justify-center text-xl font-bold border border-gray-300
                            ${!cell && isValidTarget && !boardState.winner ? 'hover:bg-yellow-200 cursor-pointer' : 'cursor-default'}
                            ${cell === 'X' ? 'text-red-600' : 'text-blue-600'}
                        `}
                        onClick={() => {
                            if (!cell && isValidTarget && !boardState.winner) {
                                onCellClick(boardRow, boardCol, rIdx, cIdx);
                            }
                        }}
                        disabled={!!cell || !!boardState.winner || !isValidTarget}
                    >
                        {cell}
                    </button>
                ))
            ))}

            {showOverlay && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 text-6xl font-extrabold opacity-40 select-none">
                    <span className={boardState.winner === 'X' ? 'text-red-800' : 'text-blue-800'}>
                        {boardState.winner}
                    </span>
                </div>
            )}
        </div>
    );
};
