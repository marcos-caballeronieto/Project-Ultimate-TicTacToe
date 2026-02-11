import { useGameState } from './hooks/useGameState';
import { BigBoard } from './components/BigBoard';

function App() {
  const { gameState, loading, error, newGame, makeMove } = useGameState();

  if (!gameState) return <div className="p-10">Loading game state...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Ultimate Tic-Tac-Toe</h1>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => newGame(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          New Game (PvP)
        </button>
        <button
          onClick={() => newGame(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          New Game (vs AI)
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-4 text-gray-500">Processing...</div>
      )}

      <div className="mb-4 text-xl font-semibold">
        {gameState.winner ? (
          <span className="text-green-600 text-3xl">Winner: {gameState.winner}!</span>
        ) : (
          <span>Current Player: <span className={gameState.current_player === 'X' ? 'text-red-600' : 'text-blue-600'}>{gameState.current_player}</span></span>
        )}
      </div>

      <BigBoard
        gameState={gameState}
        onMove={(br, bc, cr, cc) => makeMove({ board_row: br, board_col: bc, cell_row: cr, cell_col: cc })}
      />

      <div className="mt-8 max-w-md text-gray-600 text-sm">
        <h3 className="font-bold mb-2">Rules:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Get 3 in a row on a small board to win it.</li>
          <li>Win 3 small boards in a row to win the game.</li>
          <li>Your move determines which board your opponent must play in next.</li>
          <li>If sent to a won/full board, you can play anywhere! (Yellow highlight indicates valid boards)</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
