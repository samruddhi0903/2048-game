const GameControls = ({ onRestart, gameOver, gameWon, onMove }) => {
  return (
    <div className="game-controls">
      <div className="move-controls">
        <div className="move-row">
          <button onClick={() => onMove('UP')} className="move-button">↑</button>
        </div>
        <div className="move-row">
          <button onClick={() => onMove('LEFT')} className="move-button">←</button>
          <button onClick={() => onMove('DOWN')} className="move-button">↓</button>
          <button onClick={() => onMove('RIGHT')} className="move-button">→</button>
        </div>
      </div>
      <button onClick={onRestart} className="restart-button">
        New Game
      </button>
      {gameWon && <div className="game-message">You Win!</div>}
      {gameOver && !gameWon && <div className="game-message">Game Over!</div>}
    </div>
  );
};

export default GameControls;
