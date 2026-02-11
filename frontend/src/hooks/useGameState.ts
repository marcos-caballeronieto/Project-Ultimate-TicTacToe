import { useState, useEffect } from 'react';
import type { GameState, Move } from '../types/game';

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchState = async () => {
        try {
            const res = await fetch('/state');
            if (!res.ok) throw new Error('Failed to fetch state');
            const data = await res.json();
            setGameState(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const newGame = async (vsAi: boolean = false) => {
        setLoading(true);
        try {
            const res = await fetch(`/new-game?vs_ai=${vsAi}`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed to start new game');
            await fetchState();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const makeMove = async (move: Move) => {
        // Optimistic update could happen here, but for MVP we wait for server
        try {
            const res = await fetch('/move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(move),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || 'Invalid move');
            }
            const data = await res.json();
            setGameState(data);
        } catch (err: any) {
            setError(err.message);
            // Re-fetch state on error to ensure sync
            fetchState();
        }
    };

    useEffect(() => {
        fetchState();
    }, []);

    return { gameState, loading, error, newGame, makeMove };
};
