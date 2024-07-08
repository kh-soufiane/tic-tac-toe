import { useEffect, useState } from "react";
import "./App.css";
import GameBoard from "./components/game-board";
import Player from "./components/player";
import Log from "./components/log";
import GameOver from "./components/game-over";
import { getActivePlayer, getGameBoard, getWinner } from "./helpers/actions";
import { PLAYERS } from "./helpers/constantes";

export type GameTurn = {
  square: { row: number; col: number };
  player: string;
};

function App() {
  const [players, setPlayers] = useState<{ X: string; O: string }>(PLAYERS);
  const [gameTurns, setGameTurn] = useState<GameTurn[]>([]);
  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = getGameBoard(gameTurns);
  const winner = getWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleTogglePlayer = (rowIndex: number, colIndex: number) => {
    setGameTurn((prev) => {
      const currentPlayer = getActivePlayer(prev);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prev,
      ];

      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurn([]);
  };

  const handlePlayerNameChange = (symbol: string, newName: string) => {
    setPlayers((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner!} onRestart={handleRestart} />
        )}
        <GameBoard onTogglePlayer={handleTogglePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
