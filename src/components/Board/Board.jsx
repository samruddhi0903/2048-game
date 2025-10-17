import Tile from '../Tile/Tile';

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((value, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
