import React from "react";
import FootballSevice from "../../services";
import { PlayerTypes } from "../../types";
import Title from "../Title";

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
                  <fieldset className="w-full flex flex-col">
                    <label className="font-mont font-thin text-gray-100">
                      Player
                    </label>
                    <input
                      className="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white"
                      type="text"
                      value={editedPlayerName}
                      onChange={(e) => setEditedPlayerName(e.target.value)}
                    />
                  </fieldset>

                  <fieldset className="w-full flex flex-col">
                    <label className="font-mont font-thin text-gray-100">
                      Last name
                    </label>
                    <input
                      className="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white"
                      type="text"
                      value={editedPlayerLastname}
                      onChange={(e) => setEditedPlayerLastname(e.target.value)}
                    />
                  </fieldset>

                  <fieldset className="w-full flex flex-col">
                    <label className="font-mont font-thin text-gray-100">
                      Number
                    </label>
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
                  </fieldset>

                  <fieldset className="w-full flex flex-col">
                    <label className="font-mont font-thin text-gray-100">
                      Position
                    </label>
                    <span className="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white">
                      Ar
                    </span>
                  </fieldset>

                  <fieldset className="w-full flex flex-row gap-2 mt-8">
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
                  </fieldset>
                </div>
              ) : (
                <div>
                  <fieldset>
                    <label>Player:</label>
                    <span>{player.name}</span>
                  </fieldset>
                  <fieldset>
                    <label>Last name:</label>
                    <span>{player.lastName}</span>
                  </fieldset>
                  <fieldset>
                    <label>Number:</label>
                    <span>{player.numbers}</span>
                  </fieldset>
                  <fieldset>
                    <label>Postion:</label>
                    <span>{player.position}</span>
                  </fieldset>

                  <div className="flex flex-row">
                    <button
                      className=""
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
                      Editar
                    </button>

                    <button
                      className=""
                      onClick={() => handleDeletePlayer(player.id)}
                    >
                      Elimianr
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
