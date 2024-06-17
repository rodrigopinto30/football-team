import React, { Dispatch, SetStateAction, useState } from "react";
import FootballSevice from "../../services";
import { DTTypes, TeamTypes } from "../../types";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";

interface Props {
  setDTs: Dispatch<SetStateAction<DTTypes[]>>;
}

const DataFormDT: React.FC<Props> = ({ setDTs }) => {
  const [newDtName, setNewDtName] = useState<string>("");
  const [newDtLastname, setNewDtLastname] = useState<string>("");
  const [newDtTeam, setNewDtTeam] = useState<TeamTypes>();
  const [newDtFormation, setNewDtFormation] = useState<string>("");
  const [changed, setChanged] = useState<boolean>(false);
  const [teams, setTeams] = useState<TeamTypes[]>(FootballSevice.getTeam);

  const handleDt = () => {
    if (newDtName.trim() !== "") {
      const newDt = FootballSevice.addDt(
        newDtName,
        newDtLastname,
        newDtFormation
      );
      setDTs((prevDt) => [...prevDt, newDt]);
      setNewDtName("");
      setNewDtLastname("");
      setNewDtFormation("");
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
        <Label titulo="Name" />
        <Input
          type="text"
          clases="p-1 rounded-md bg-gray-300 outline-none focus:bg-white"
          placeholder="Add DT name"
          value={newDtName}
          change={(e) => setNewDtName(e.target.value)}
          focus={true}
        />
      </div>

      <div className="flex flex-col">
        <Label titulo="Last name"/>
        <Input
          type="text"
          clases="p-1 rounded-md bg-gray-300 outline-none focus:bg-white"
          placeholder="Add DT last name"
          value={newDtLastname}
          change={(e) => setNewDtLastname(e.target.value)}
          focus={true}
        />
      </div>

      <div className="flex flex-row gap-5">
        <div className="flex flex-col w-full">
          <Label titulo="Formation"/>
          <Input
            type="text"
            clases="p-1 rounded-md bg-gray-300 outline-none focus:bg-white"
            placeholder="Add formation"
            value={newDtFormation}
            change={(e) => setNewDtFormation(e.target.value)}
            focus={true}
          />
        </div>

        <div className="flex flex-col w-full">
          <Label titulo="Team"/>
          {teams.length == 0 ? (
            <label className="p-1 rounded-md bg-gray-300 font-mont font-medium outline-none focus:bg-white">
              There is not team
            </label>
          ) : (
            <select
              className="p-1 rounded-md bg-gray-300 outline-none focus:bg-white"
              // onChange={(e)=>setNewDTPosition(e.target.value)}
            >
              {teams.map((team) => (
                <option key={team.id} selected>{team.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="w-full mt-8">
        <Button
          title="Add team"
          clases="p-1 font-mont font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
          onclick={handleDt}
        />
      </div>
    </div>
  );
};

export default DataFormDT;
