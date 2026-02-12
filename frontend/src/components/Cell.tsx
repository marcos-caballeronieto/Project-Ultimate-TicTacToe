import React from 'react';
import { motion } from 'framer-motion';
import { X, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

interface CellProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
    disabled?: boolean;
    isValidMove?: boolean;
    isWinning?: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, disabled, isValidMove, isWinning }) => {
    return (
        <motion.button
            whileHover={!disabled && !value ? { scale: 0.95 } : {}}
            whileTap={!disabled && !value ? { scale: 0.9 } : {}}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "relative flex items-center justify-center w-full h-full rounded-sm transition-colors duration-200",
                "bg-zinc-900/50 backdrop-blur-sm",
                // Valid move hover effect
                !value && !disabled && isValidMove && "hover:bg-zinc-800 cursor-pointer shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]",
                // Disabled state
                (disabled || value) && "cursor-default",
                // Winning cell glow
                isWinning && value === 'X' && "shadow-[0_0_15px_rgba(34,211,238,0.5)] bg-zinc-800 border-cyan-400/30",
                isWinning && value === 'O' && "shadow-[0_0_15px_rgba(232,121,249,0.5)] bg-zinc-800 border-fuchsia-400/30"
            )}
        >
            {value === 'X' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <X className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" strokeWidth={3} />
                </motion.div>
            )}
            {value === 'O' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <Circle className="w-5 h-5 text-fuchsia-400 drop-shadow-[0_0_5px_rgba(232,121,249,0.8)]" strokeWidth={3} />
                </motion.div>
            )}
        </motion.button>
    );
};
