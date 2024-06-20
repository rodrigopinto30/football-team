import React, { useState, Dispatch, SetStateAction } from "react";
import FootballSevice from "../../services";
import { DTTypes, PlayerTypes, TeamTypes } from "../../types";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";

interface Props {
  setTeams: Dispatch<SetStateAction<TeamTypes[]>>;
}

const DataForm: React.FC<Props> = ({ setTeams }) => {
  const [newTeamName, setNewTeamName] = useState<string>("");
  const [newTeamStadium, setNewTeamStadium] = useState<string>("yes");
  const [dtId, setDtId] = useState<number>(0);
  const [newDt, setNewDt] = useState<DTTypes | null>();
  const [changed, setChanged] = useState<boolean>(false);
  const [dts, setDts] = useState<DTTypes[]>(FootballSevice.getDts);
  const [players, setPlayers] = useState<PlayerTypes[]>(
    FootballSevice.getPlayer
  );

  const handleTeam = () => {
    if (newTeamName.trim() !== "") {
      const dt = dts.find((dt) => dt.id === dtId) || null;
      let newTeam: TeamTypes;
      if (dt) {
        newTeam = FootballSevice.addTeam(newTeamName, newTeamStadium, dt);
      } else {
        newTeam = FootballSevice.addTeam(newTeamName, newTeamStadium);
      }
      setTeams((prevTeam) => [...prevTeam, newTeam]);
      setNewTeamName("");
      setChanged(true);
    } else {
      alert("Debes ingresar el nombre de un equipo");
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
        <Label titulo="Name" />
        <Input
          type="text"
          placeholder="Add team name"
          clases="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white"
          value={newTeamName}
          change={(e) => setNewTeamName(e.target.value)}
          focus={true}
          checked={false}
        />
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-full">
          <Label titulo="Does it have a stadium?" />
          <label
            htmlFor="stadium-yes"
            className="flex flex-row gap-1 font-mont font-medium text-white"
          >
            <input
              id="stadium-si"
              type="radio"
              name="stadium"
              value="si"
              onChange={() => setNewTeamStadium("si")}
              className="inline"
              checked
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
              onChange={() => setNewTeamStadium("no")}
              className="inline"
            />
            No
          </label>
        </div>

        <div className="flex flex-col w-full">
          <Label titulo="Select DT" />
          {dts.length == 0 ? (
            <label className="p-1 rounded-md bg-gray-300 font-mont font-medium outline-none focus:bg-white">
              There is not DT
            </label>
          ) : (
            <select
              className="p-1 rounded-md bg-gray-300 font-mont font-medium outline-none focus:bg-white"
              onChange={(e) => setDtId(parseInt(e.target.value))}
            >
              <option className="font-mont font-medium" defaultValue={0}>
                -
              </option>
              {dts.map((dt) =>
                dt.team !== null ? (
                  ""
                ) : (
                  <option
                    key={dt.id}
                    className="font-mont font-medium"
                    value={dt.id}
                  >
                    {dt.lastName}
                  </option>
                )
              )}
            </select>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <Label titulo="Players" />
        <ul>
          {players.map((player, index) => {
            return (
              <li key={index}>
                <input
                  type={"checkbox"}
                  value={player.name + " " + player.lastName}
                  disabled={!player.team}
                />
                <label htmlFor="">{player.name + " " + player.lastName}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full mt-8">
        <Button
          title="Add team"
          clases="p-1 font-mont font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
          onclick={handleTeam}
        />
      </div>
    </div>
  );
};

export default DataForm;
