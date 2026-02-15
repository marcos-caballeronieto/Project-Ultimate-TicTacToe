import { useGameState } from './hooks/useGameState';
import { BigBoard } from './components/BigBoard';
import { GameInfo } from './components/GameInfo';
import { Maximize, Minimize, Trophy, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';

function App() {
  const { gameState, loading, error, newGame, makeMove, isVsAi } = useGameState();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync fullscreen state with browser events (e.g. Esc key)
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center font-display gap-6 p-4">
        <div className="animate-pulse text-zinc-400 tracking-widest">INITIALIZING SYSTEM...</div>
        {error && (
          <div className="max-w-md p-4 bg-red-950/30 border border-red-500/30 text-red-400 font-mono text-xs rounded-xl backdrop-blur-md">
            <p className="font-bold mb-2">CRITICAL ERROR</p>
            <p>{error}</p>
            <p className="mt-4 text-zinc-500">Check console for details.</p>
          </div>
        )}
      </div>
    );
  }

  const isGameOver = !!gameState.winner;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans transition-colors duration-500 overflow-x-hidden">

      {/* Fullscreen Toggle Floating Button */}
      <button
        onClick={toggleFullscreen}
        className="fixed top-6 right-6 z-50 p-3 bg-zinc-900/80 border border-zinc-800 rounded-full text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all backdrop-blur-md shadow-lg"
        title="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>

      {/* Header - Hide in fullscreen */}
      {!isFullscreen && (
        <header className="mb-8 text-center space-y-2 relative">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              ULTIMATE TIC-TAC-TOE
            </h1>
            <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase font-medium">Neural Interface v2.0</p>
          </motion.div>
        </header>
      )}

      {/* Main Content Layout */}
      <div className={cn(
        "flex flex-col xl:flex-row gap-12 items-center xl:items-start w-full max-w-7xl mx-auto relative",
        isFullscreen && "xl:justify-center"
      )}>

        {/* Left Column: Game Info - Hide in fullscreen */}
        {!isFullscreen && (
          <div className="w-full max-w-md xl:w-80 flex-shrink-0 order-2 xl:order-1">
            <GameInfo
              gameState={gameState}
              currentPlayer={gameState.current_player}
              winner={gameState.winner}
              isAiTurn={isVsAi && gameState.current_player === 'O' && !gameState.winner}
              onReset={newGame}
            />

            {/* Loading / Error States */}
            <div className="mt-6 space-y-3">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 bg-red-950/20 border border-red-500/30 text-red-400 text-sm rounded-xl backdrop-blur-md flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {loading && (
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 text-zinc-500 text-sm rounded-xl flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  SYNCING DATA...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Center: The Board */}
        <div className={cn(
          "flex-grow order-1 xl:order-2 flex justify-center w-full relative",
          isFullscreen && "max-w-4xl" // Make board larger in fullscreen
        )}>
          <BigBoard
            gameState={gameState}
            onMove={(br, bc, cr, cc) => makeMove({ board_row: br, board_col: bc, cell_row: cr, cell_col: cc })}
          />

          {/* Global Win Animation Overlay */}
          <AnimatePresence>
            {isGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-zinc-950/40 backdrop-blur-md rounded-2xl border-2 border-cyan-400/30 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 shadow-2xl text-center space-y-6 relative overflow-hidden"
                >
                  {/* Decorative Background Glows */}
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-400/10 blur-3xl rounded-full" />
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-fuchsia-400/10 blur-3xl rounded-full" />

                  <div className="flex justify-center">
                    <div className="p-4 bg-zinc-800 rounded-2xl border border-zinc-700 shadow-inner">
                      <Trophy size={48} className={cn(
                        gameState.winner === 'X' ? "text-cyan-400" : "text-fuchsia-400"
                      )} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-zinc-500 text-sm uppercase tracking-widest font-bold">System Override Complete</h2>
                    <p className="text-5xl font-display font-black text-white">
                      {gameState.winner === 'Draw' ? "PROTOCOL DRAW" : `PLAYER ${gameState.winner} DOMINATES`}
                    </p>
                  </div>

                  <button
                    onClick={() => newGame(isVsAi)}
                    className="w-full bg-zinc-100 text-zinc-950 font-bold py-4 rounded-xl hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles size={20} />
                    RESTART NEURAL LINK
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Directives - Hide in fullscreen */}
        {!isFullscreen && (
          <div className="w-full max-w-md xl:w-64 flex-shrink-0 order-3 text-zinc-500 text-xs leading-relaxed opacity-60 hover:opacity-100 transition-opacity duration-300">
            <h3 className="font-bold text-zinc-300 mb-4 uppercase tracking-[0.2em]">Operational Directives</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-mono">01</span>
                <p>Establish a sequence of <span className="text-zinc-300">3 sub-grids</span> to trigger global system victory.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-mono">02</span>
                <p>Vector mapping: Your move data determines the <span className="text-zinc-300">active sector</span> for the opponent.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-mono">03</span>
                <p>Highlighted sectors indicate <span className="text-yellow-400/80">valid engagement zones</span>.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-mono">04</span>
                <p>Compromised sectors (Full/Won) allow <span className="text-zinc-300">free tactical deployment</span> across all valid zones.</p>
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
