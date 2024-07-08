type Props = {
  onTogglePlayer: (rowIndex: number, colIndex: number) => void;
  board: any[][];
};

const GameBoard = ({ onTogglePlayer, board }: Props) => {
  return (
    <ol id="game-board">
      {board.map((row, rowindex) => (
        <li key={rowindex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onTogglePlayer(rowindex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
