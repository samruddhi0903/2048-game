import { useGame } from './hooks/useGame';
import Board from './components/Board';
import GameControls from './components/GameControls';
import './App.css';

function App() {
  const { board, score, gameOver, gameWon, initGame, handleMove } = useGame();

  return (
    <div className="app">
      <h1>2048 Game</h1>
      <div className="score">Score: {score}</div>
      <Board board={board} />
      <GameControls onRestart={initGame} gameOver={gameOver} gameWon={gameWon} onMove={handleMove} />
    </div>
  );
}

export default App;
