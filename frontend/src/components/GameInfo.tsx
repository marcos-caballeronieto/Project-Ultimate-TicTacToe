import React from 'react';
import type { GameState } from '../types/game';
import { Bot, User, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

interface GameInfoProps {
    gameState: GameState;
    currentPlayer: 'X' | 'O';
    winner: 'X' | 'O' | 'Draw' | null;
    isAiTurn?: boolean;
    onReset: (vsAi: boolean) => void;
}

export const GameInfo: React.FC<GameInfoProps> = ({ gameState, currentPlayer, winner, isAiTurn, onReset }) => {
    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
            {/* Status Card */}
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
                {/* Glow effect based on current player */}
                <div className={cn(
                    "absolute top-0 left-0 w-1 h-full transition-colors duration-500",
                    currentPlayer === 'X' ? "bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "bg-fuchsia-400 shadow-[0_0_10px_#e879f9]"
                )} />

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-zinc-400 text-sm tracking-wider uppercase font-medium">Status</h2>
                    {isAiTurn && (
                        <div className="flex items-center gap-2 text-yellow-400 text-xs animate-pulse">
                            <Bot size={14} />
                            <span>AI Thinking...</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-4xl font-display font-bold text-zinc-100">
                            {winner ? (
                                winner === 'Draw' ? "Draw!" : `Player ${winner} Wins!`
                            ) : (
                                `Player ${currentPlayer}'s Turn`
                            )}
                        </span>
                        {!winner && (
                            <div className="flex flex-col mt-2 gap-2">
                                {/* First Turn Warning */}
                                {gameState.next_board && gameState.next_board[0] === 1 && gameState.next_board[1] === 1 &&
                                    gameState.board.every(row => row.every(b => !b.winner && b.grid.every(r => r.every(c => c === null)))) && (
                                        <div className="flex items-center gap-2 p-2 bg-yellow-400/10 border border-yellow-400/20 rounded text-yellow-500">
                                            <AlertTriangle size={16} />
                                            <span className="font-bold text-xs tracking-widest uppercase animate-pulse">
                                                INITIAL SEQUENCE: CENTER SECTOR
                                            </span>
                                        </div>
                                    )}
                                <div className="text-zinc-500 text-sm flex items-center gap-2">
                                    <span className={cn(
                                        "w-1.5 h-1.5 rounded-full",
                                        gameState.next_board ? "bg-cyan-400" : "bg-green-400"
                                    )}></span>
                                    {gameState.next_board
                                        ? `Target Sector: (${gameState.next_board[0] + 1}, ${gameState.next_board[1] + 1})`
                                        : "Free Engagement: Any Sector"
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 w-full">
                <button
                    onClick={() => onReset(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 py-3 rounded-lg transition border border-zinc-700 hover:border-zinc-600"
                >
                    <User size={18} />
                    <User size={18} className="text-fuchsia-400 -ml-1" />
                    <span>PvP</span>
                </button>
                <button
                    onClick={() => onReset(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 py-3 rounded-lg transition border border-zinc-700 hover:border-zinc-600 group"
                >
                    <User size={18} />
                    <Bot size={18} className="text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
                    <span>PvAI</span>
                </button>
            </div>
        </div>
    );
};
