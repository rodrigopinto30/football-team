import React from 'react'
import FootballSevice from '../../services';
import { DTTypes, TeamTypes } from '../../types';
import Title from '../Title';

const DataTableDT = () => {

    const [dts, setDts] = React.useState<DTTypes[]>(
        FootballSevice.getDts()
    );

    const [editingDtId, setEditingDtId] = React.useState<number | null>(null);
    const [editedDTName, setEditedDTName] = React.useState<string>("");
    const [editedDTLastname, setEditedDTLastname] = React.useState("");
    const [editedDTTeam, setEditedDTTeam] = React.useState<DTTypes>();
    const [editedDTFormation, setEditedDTFormation] = React.useState<string>("");

      const handleEditCancel=()=>{
        setEditingDtId(null);
      }

      const handleEditSave =(id:number)=>{
        if(editedDTName.trim() !== ""){
          const updateDT = FootballSevice.updateDt({
            id,
            name: editedDTName,
            lastName: editedDTLastname,
            formation: editedDTFormation
          });

          setDts((prevDT) => prevDT.map((dt)=>(dt.id == id? updateDT : dt)));
          setEditingDtId(null);
        }
      }

      const handleEditStart=(
        id: number,
        name: string, 
        lastname: string, 
        formation: string,
        // team?:TeamTypes, 
        )=>{
          setEditingDtId(id);
          setEditedDTName(name);
          setEditedDTLastname(lastname);
          setEditedDTFormation(formation);
      }

      const handleDeleteDT =(id:number)=>{
        FootballSevice.deleteDt(id);
        setDts((prevdt) => prevdt.filter((dt) => dt.id !== id));
      }

    return (
        <div className="flex flex-col gap-6 w-[60%] mt-[5%]">
          <Title titulo="DTS" />
    
          <div className="grid grid-cols-4 gap-6">
            {dts.length == 0 ? (
              <div>
                <h4 className="font-mont font-medium text-white text-center text-md">
                  There are not DTs
                </h4>
              </div>
            ) : (
              dts.map((dt) => (
                <div
                  key={dt.id}
                  className="bg-white bg-opacity-10 rounded-md backdrop-blur-md p-4"
                >
                  {editingDtId === dt.id ? (
                    <div className="flex flex-col gap-2">
                      <fieldset className="w-full flex flex-col">
                        <label className="font-mont font-thin text-gray-100">
                          DT
                        </label>
                        <input
                          className="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white"
                          type="text"
                          value={editedDTName}
                          onChange={(e) => setEditedDTName(e.target.value)}
                        />
                      </fieldset>
    
                      <fieldset className="w-full flex flex-col">
                        <label className="font-mont font-thin text-gray-100">
                          Last name
                        </label>
                        <input
                          className="p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white"
                          type="text"
                          value={editedDTLastname}
                          onChange={(e) => setEditedDTLastname(e.target.value)}
                        />
                      </fieldset>

                      <fieldset className="flex flex-col">
                        <span className='text-white'>Team</span>
                        <select 
                          className='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
                          // onChange={(e)=>setNewDTPosition(e.target.value)}
                        >
                          <option selected>Manchester</option>
                          <option>Boca</option>
                          <option>Real Madrid</option>
                          <option>Flamengo</option>
                        </select>
                      </fieldset>

                      <fieldset className="flex flex-col">
                        <legend className='font-mont font-thin text-gray-100'
                        >Formation</legend>
                          <input 
                            type="text"
                            className='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
                            placeholder='Add formation'
                            value={editedDTFormation}  
                            onChange={(e)=>setEditedDTFormation(e.target.value)}
                            // focus={true}
                          />
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
                          onClick={() => handleEditSave(dt.id)}
                        >
                          Save
                        </button>
                      </fieldset>
                    </div>
                  ) : ( 
                    <div className="flex flex-col gap-2">
                      <fieldset className="w-full flex flex-col">
                        <label className="font-mont font-thin text-gray-100">DT:</label>
                        <span className="font-mont font-medium text-white">
                          {dt.name} 
                          </span>
                      </fieldset>
                      <fieldset className="w-full flex flex-col">
                        <label className="font-mont text-gray-400">Last name:</label>
                          <span className="text-white">
                            {dt.lastName}
                          </span>
                      </fieldset>
                      <fieldset className="w-full flex flex-col">
                        <label className="font-mont text-gray-400">Formation:</label>
                          <span className="text-white">
                            {dt.formation}
                          </span>
                      </fieldset>
                      <fieldset className="w-full flex flex-col">
                        <label className="font-mont text-gray-400">Team:</label>
                          <span className="text-white">
                            Team
                          </span>
                      </fieldset>
                      <div className="w-full flex flex-row gap-2 mt-8">
                        <button
                          className="w-full font-mont font-medium text-white border-2 bg-blue-400 border-blue-400 rounded-md p-1 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                          onClick={() =>
                            handleEditStart(
                              dt.id,
                              dt.name,
                              dt.lastName,
                              // dt.team,
                              dt.formation
                            )
                          }
                        >
                          Edit
                        </button>
    
                        <button
                          className="w-full font-mont font-medium text-white border-2 bg-red-400 border-red-400 rounded-md p-1 hover:bg-red-500 hover:border-red-500 hover:text-white"
                          onClick={() => handleDeleteDT(dt.id)}
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


export default DataTableDT;