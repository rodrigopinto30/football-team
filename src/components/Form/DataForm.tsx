import React, { useState, Dispatch, SetStateAction } from 'react'
import FootballSevice from '../../services';
import { TeamTypes } from '../../types';


interface Props {
  setTeams: Dispatch<SetStateAction<TeamTypes[]>>;
}

const DataForm:React.FC<Props> = ({setTeams}) => {

  const[newTeamName, setNewTeamName] = useState<string>("");
  const[newTeamStadium, setNewTeamStadium] = useState<string>("yes");

  const handleTeam =()=>{
    if(newTeamName.trim() !== ""){
      const newTeam = FootballSevice.addTeam(newTeamName, newTeamStadium);
      setTeams((prevTeam)=>[...prevTeam, newTeam]);
      setNewTeamName("");
    }else{
      alert("Debes ingresar el nombre de un equipo")
    }
  }

  return (
    <div className='flex flex-col gap-3 p-4 bg-white bg-opacity-10 rounded-md backdrop-blur-md w-[60%]'>
      
      <fieldset className='flex flex-col'>
        <legend className='text-white'>Name</legend>
        <input
          type="text"
          placeholder='Add team name'
          className='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
          value={newTeamName}
          onChange={(e)=>setNewTeamName(e.target.value)}
          autoFocus={true}
          />
      </fieldset>

        <fieldset className='flex flex-col'>
          <legend className='text-white'>Does it have a stadium?</legend>
          <label 
            htmlFor="stadium-yes"
            className='flex flex-row gap-1 text-white'
          >
            <input 
              id="stadium-yes" 
              type="radio" 
              name="stadium"
              value="yes"
              onChange={()=>setNewTeamStadium("yes")}
              className="inline" 
              checked
            /> 
              Yes
          </label>
          <label 
            htmlFor="stadium-no"
            className='flex flex-row gap-1 text-white'
          >
            <input 
              id="stadium-no" 
              type="radio" 
              name="stadium"
              value="no" 
              onChange={()=>setNewTeamStadium("no")}
              className="inline " 
            />
              No
            </label>
        </fieldset>
          
        
        <div className='flex flex-col'>
          <span className='text-white'>Select DT:</span>
          <select 
            className='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
            >
            <option selected>None</option>
            <option>Juan</option>
            <option>Pedro</option>
          </select>
        </div>

    <div className='w-full'>
      <button
        className='text-white p-1 bg-green-700 rounded-md hover:bg-green-500'
          onClick={handleTeam}
        >
          Add Team
        </button>
    </div>
    </div>
  )
}

export default DataForm