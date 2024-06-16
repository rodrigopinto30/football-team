import React from "react";
import FootballSevice from "../../services";
import { PlayerTypes } from "../../types";
import Title from "../Title";
import Label from "./Label";

const DataTablePlayer = () => {
  const [players, setPlayers] = React.useState<PlayerTypes[]>(
    FootballSevice.getPlayer()
  );
  const [editingPlayerId, setEditingPlayerId] = React.useState<number | null>(
    null
  );

  const [editedPlayerName, setEditedPlayerName] = React.useState<string>("");
  const [editedPlayerLastname, setEditedPlayerLastname] =
    React.useState<string>("");
  const [editedPlayerNumber, setEditedPlayerNumber] = React.useState<number>(0);
  const [editedPlayerPosition, setEditedPlayerPosition] =
    React.useState<string>("");
  // const [editedPlayerTeam, setEditedPlayerTeam] = React.useState<PlayerTypes>();

  const handleEditStart = (
    id: number,
    name: string,
    lastName: string,
    numbers: number,
    position: string
  ) => {
    setEditingPlayerId(id);
    setEditedPlayerName(name);
    setEditedPlayerLastname(lastName);
    setEditedPlayerNumber(numbers);
    setEditedPlayerPosition(position);
  };

  const handleEditCancel = () => {
    setEditingPlayerId(null);
  };

  const handleEditSave = (id: number) => {
    if (editedPlayerName.trim() !== "") {
      const updatePlayer = FootballSevice.updatePlayer({
        id,
        name: editedPlayerName,
        lastName: editedPlayerLastname,
        numbers: editedPlayerNumber,
        position: editedPlayerPosition,
      });

      setPlayers((prevPlayer) =>
        prevPlayer.map((player) => (player.id === id ? updatePlayer : player))
      );
      setEditingPlayerId(null);
    }
  };

  const handleDeletePlayer = (id: number) => {
    FootballSevice.deletePlayer(id);
    setPlayers((prevPlayer) => prevPlayer.filter((player) => player.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 w-[60%] mt-[5%]">
      <Title titulo="PLAYERS" />

      <div className="grid grid-cols-4 gap-6">
        {players.length == 0 ? (
          <div>
            <h4 className="font-mont font-medium text-white text-center text-md">
              There are not players
            </h4>
          </div>
        ) : (
          players.map((player) => (
            <div
              key={player.id}
              className="bg-white bg-opacity-10 rounded-md backdrop-blur-md p-4"
            >
              {editingPlayerId === player.id ? (
                <div className="flex flex-col gap-2">
                  <div className="w-full flex flex-col">
                    <Label titulo="Player"/>
                    <input
                      className="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white"
                      type="text"
                      value={editedPlayerName}
                      onChange={(e) => setEditedPlayerName(e.target.value)}
                    />
                  </div>

                  <div className="w-full flex flex-col">
                    <Label titulo="Last name"/>
                    <input
                      className="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white"
                      type="text"
                      value={editedPlayerLastname}
                      onChange={(e) => setEditedPlayerLastname(e.target.value)}
                    />
                  </div>

                  <div className="w-full flex flex-col">
                    <Label titulo="Number"/>
                    <input
                      className="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white"
                      type="number"
                      min={1}
                      max={50}
                      value={editedPlayerNumber}
                      onChange={(e) =>
                        setEditedPlayerNumber(parseInt(e.target.value))
                      }
                    />
                  </div>

                  <div className="w-full flex flex-col">
                    <Label titulo="Position"/>
                    <span className="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white">
                      Ar
                    </span>
                  </div>

                  <div className="w-full flex flex-row gap-2 mt-8">
                    <button
                      className="w-full font-mont font-medium text-white border-2 bg-red-400 border-red-400 rounded-md p-1 hover:bg-red-500 hover:border-red-500 hover:text-white"
                      onClick={() => handleEditCancel()}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-full font-mont font-medium text-white border-2 bg-green-400 border-green-400 rounded-md p-1 hover:bg-green-500 hover:border-green-500 hover:text-white"
                      onClick={() => handleEditSave(player.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : ( 
                <div className="flex flex-col gap-2">
                  <div className="w-full flex flex-col">
                    <Label titulo="Player"/>
                    <span className="font-mont font-medium text-white">
                      {player.name}</span>
                  </div>
                  <div className="w-full flex flex-col">
                    <Label titulo="Last name"/>
                    <span className="text-white">{player.lastName}</span>
                  </div>
                  <div className="w-full flex flex-col">
                    <Label titulo="Number"/>
                    <span className="text-white">{player.numbers}</span>
                  </div>
                  <div className="w-full flex flex-col">
                    <Label titulo="Position"/>
                    <span className="text-white">{player.position}</span>
                  </div>

                  <div className="w-full flex flex-row gap-2 mt-8">
                    <button
                      className="w-full font-mont font-medium text-white border-2 bg-blue-400 border-blue-400 rounded-md p-1 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                      onClick={() =>
                        handleEditStart(
                          player.id,
                          player.name,
                          player.lastName,
                          player.numbers,
                          player.position
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="w-full font-mont font-medium text-white border-2 bg-red-400 border-red-400 rounded-md p-1 hover:bg-red-500 hover:border-red-500 hover:text-white"
                      onClick={() => handleDeletePlayer(player.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataTablePlayer;
