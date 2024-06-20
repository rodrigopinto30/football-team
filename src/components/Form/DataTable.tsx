import React from "react";
import FootballSevice from "../../services";
import { TeamTypes, DTTypes, PlayerTypes } from "../../types";
import Title from "../Title";
import Input from "./Input";
import Label from "./Label";

const DataTable: React.FC = () => {
  const [teams, setTeams] = React.useState<TeamTypes[]>(
    FootballSevice.getTeam()
  );
  const [editingTeamId, setEditingTeamId] = React.useState<number | null>(null);
  const [editedTeamName, setEditedTeamName] = React.useState<string>("");
  const [stadium, setStadium] = React.useState<string>("yes");

  // Function for handling edit Actions.
  const handleEditStart = (id: number, name: string) => {
    setEditingTeamId(id);
    setEditedTeamName(name);
  };

  const handleEditCancel = () => {
    setEditingTeamId(null);
    setEditedTeamName("");
  };

  const handleEditSave = (id: number) => {
    if (editedTeamName.trim() !== "") {
      const updateTeam = FootballSevice.updateTeam({
        id,
        name: editedTeamName,
        stadium: stadium,
      });
      setTeams((prevTeam) =>
        prevTeam.map((team) => (team.id === id ? updateTeam : team))
      );

      setEditingTeamId(null);
      setEditedTeamName("");
    }
  };

  const handleDeleteTeam = (id: number) => {
    FootballSevice.deleteTeam(id);
    setTeams((prevTeam) => prevTeam.filter((team) => team.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 w-[60%] mt-[5%]">
      <Title titulo="TEAMS" />

      <div className="grid grid-cols-4 gap-6">
        {teams.length == 0 ? (
          <div>
            <h4 className="flex flex-row gap-1 font-mont font-medium text-white text-center text-md">
              There are not teams
            </h4>
          </div>
        ) : (
          teams.map((team) => (
            <div
              key={team.id}
              className="bg-white bg-opacity-10 rounded-md backdrop-blur-md p-4"
            >
              {editingTeamId === team.id ? (
                <div className="flex flex-col gap-2">
                  <div className="w-full flex flex-col">
                    <Label titulo="Team" />
                    <Input
                      clases="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white"
                      type="text"
                      value={editedTeamName}
                      change={(e) => setEditedTeamName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <Label titulo="Does it have a stadium?" />
                    <label
                      htmlFor="stadium-yes"
                      className="flex flex-row gap-1 font-mont font-medium text-white"
                    >
                      <input
                        id="stadium-yes"
                        type="radio"
                        name="stadium"
                        value="yes"
                        onChange={() => setStadium("yes")}
                        className="inline"
                      />
                      Yes
                    </label>
                    <label
                      htmlFor="stadium-no"
                      className="flex flex-row gap-1 font-mont font-medium text-white"
                    >
                      <input
                        id="stadium-no"
                        type="radio"
                        name="stadium"
                        value="no"
                        onChange={() => setStadium("no")}
                        className="inline"
                      />
                      No
                    </label>
                  </div>

                  <div>
                    <Label titulo="DT" />
                    <span className="flex flex-row gap-1 font-mont font-medium text-white">
                      {team.dt == null ? <> - </> : team.dt.name}
                    </span>
                  </div>

                  <div>
                    <Label titulo="Players" />
                    <div>
                      {team.players == null ? (
                        <> - </>
                      ) : (
                        team.players?.map((player) => (
                          <span key={player.id}>
                            {player.name}
                            <input type="checkbox" />
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="w-full flex flex-row gap-2 mt-8">
                    <button
                      className="w-full flex flex-row gap-1 font-mont font-medium text-white border-2 bg-red-400 border-red-400 rounded-md p-1 hover:bg-red-500 hover:border-red-500 hover:text-white"
                      onClick={() => handleEditCancel()}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-full flex flex-row gap-1 font-mont font-medium text-white border-2 bg-green-400 border-green-400 rounded-md p-1 hover:bg-green-500 hover:border-green-500 hover:text-white"
                      onClick={() => handleEditSave(team.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="w-full flex flex-col">
                    <Label titulo="Team" />
                    <span className="flex flex-row gap-1 font-mont font-medium text-white">
                      {team.name}
                    </span>
                  </div>
                  <div className="w-full flex flex-col">
                    <Label titulo="Stadium" />
                    <span className="text-white">{team.stadium}</span>
                  </div>
                  <div className="w-full flex flex-col">
                    <Label titulo="DT" />
                    <span className="flex flex-row gap-1 font-mont font-medium text-white">
                      {team.dt == null ? <> - </> : <>{team.dt.name + " " + team.dt.lastName}</>}
                    </span>
                  </div>
                  <div className="font-mont w-full flex flex-col">
                    <Label titulo="Players" />
                    <ul>
                      {team.players == null ? (
                        <> - </>
                      ) : (
                        team.players.map((juagador) => (
                          <li>
                            <span className="font-mont text-gray-400">
                              Name:
                              <span className="text-white">
                                {juagador.numbers}
                              </span>
                            </span>
                            <span className="font-mont text-gray-400">
                              Position:
                              <span className="text-white">
                                {juagador.position}
                              </span>
                            </span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="w-full flex flex-row gap-2 mt-8">
                    <button
                      className="w-full flex flex-row gap-1 font-mont font-medium text-white border-2 bg-blue-400 border-blue-400 rounded-md p-1 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                      onClick={() => handleEditStart(team.id, team.name)}
                    >
                      Edit
                    </button>
                    <button
                      className="w-full flex flex-row gap-1 font-mont font-medium text-white border-2 bg-red-400 border-red-400 rounded-md p-1 hover:bg-red-500 hover:border-red-500 hover:text-white"
                      onClick={() => handleDeleteTeam(team.id)}
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

export default DataTable;
