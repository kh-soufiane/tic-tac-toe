import { useState } from "react";

type Props = {
  name: string;
  symbol: string;
  isActive: boolean;
  onChangeName: (symbol: string, newName: string) => void;
};

const Player = ({ name, symbol, isActive, onChangeName }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>(name);

  const handleEditing = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) onChangeName(symbol, playerName);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <div className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={(event) => handleChange(event)}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </div>
      <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
