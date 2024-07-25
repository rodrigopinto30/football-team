import React, { useState, Dispatch, SetStateAction } from "react";
import FootballSevice from "../../services";
import { PlayerTypes } from "../../types";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";

interface Props {
  setPlayers: Dispatch<SetStateAction<PlayerTypes[]>>;
}

const DataFormPlayer: React.FC<Props> = ({ setPlayers }) => {
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [newPlayerLastname, setNewPlayerLastname] = useState<string>("");
  const [newPlayerNumber, setNewPlayerNumber] = useState<number>(0);
  const [newPlayerPosition, setNewPlayerPosition] = useState<string>("");
  const [changed, setChanged] = useState<boolean>(false);

  const handlePlayer = () => {
    if (newPlayerName.trim() !== "") {
      const newPlayer = FootballSevice.addPlayer(
        newPlayerName,
        newPlayerLastname,
        newPlayerNumber,
        newPlayerPosition
      );
      setPlayers((prevPlayer) => [...prevPlayer, newPlayer]);
      setNewPlayerName("");
      setNewPlayerLastname("");
      setNewPlayerNumber(0);
      setChanged(true);
    } else {
      alert("Debes ingresar los datos correctamente.");
    }
  };

  React.useEffect(() => {
    if (changed) {
      window.location.reload();
    }
  }, [changed]);

  return (
    <div className="flex flex-col gap-3 p-4 bg-white bg-opacity-10 rounded-md backdrop-blur-md w-[60%]">
      <div className="flex flex-col">
        <Label titulo="Name"/>
        <Input
          type="text"
          clases="p-1 rounded-md bg-gray-300 outline-none focus:bg-white"
          placeholder="Add player name"
          value={newPlayerName}
          change={(e) => setNewPlayerName(e.target.value)}
          focus={true}
        />
      </div>

      <div className="flex flex-col">
        <Label titulo="Last name"/>
        <Input
          type="text"
          clases="p-1 rounded-md bg-gray-300 outline-none focus:bg-white"
          placeholder="Add player last name"
          value={newPlayerLastname}
          change={(e) => setNewPlayerLastname(e.target.value)}
          focus={true}
        />
      </div>

      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-full">
          <Label titulo="Number"/>
          <Input
            type="number"
            clases="p-1 rounded-md bg-gray-300 outline-none focus:bg-white"
            min={1}
            max={50}
            placeholder="Add player number"
            value={newPlayerNumber}
            change={(e) => setNewPlayerNumber(parseInt(e.target.value))}
            focus={true}
          />
        </div>

        <div className="flex flex-col w-full">
          <Label titulo="Position"/>
          <select
            className="p-1 rounded-md bg-gray-300 outline-none focus:bg-white"
            onChange={(e) => setNewPlayerPosition(e.target.value)}
          >
            <option defaultValue="Arquero">Arquero</option>
            <option>Defensor</option>
            <option>Mediocampista</option>
            <option>Delantero</option>
          </select>
        </div>
      </div>

      <div className="w-full mt-8">
        <Button
          title="Add player"
          clases="p-1 font-mont font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
          onclick={handlePlayer}
        />
      </div>
    </div>
  );
};

export default DataFormPlayer;
