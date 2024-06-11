import React, { useState, Dispatch, SetStateAction } from 'react'
import FootballSevice from '../../services';
import { TeamTypes } from '../../types';
import Button from './Button';
import Input from './Input';


interface Props {
  setTeams: Dispatch<SetStateAction<TeamTypes[]>>;
}

const DataForm:React.FC<Props> = ({setTeams}) => {

  const[newTeamName, setNewTeamName] = useState<string>("");
  const[newTeamStadium, setNewTeamStadium] = useState<string>("yes");
  const[changed, setChanged] = useState<boolean>(false);

  const handleTeam =()=>{
    if(newTeamName.trim() !== ""){
      const newTeam = FootballSevice.addTeam(newTeamName, newTeamStadium);
      setTeams((prevTeam)=>[...prevTeam, newTeam]);
      setNewTeamName("");
      setChanged(true);
    }else{
      alert("Debes ingresar el nombre de un equipo")
    }
  }

  React.useEffect(()=>{
    if(changed){
      window.location.reload();
      }
  },[changed]);

  return (
    <div className='flex flex-col gap-3 p-4 bg-white bg-opacity-10 rounded-md backdrop-blur-md w-[60%]'>
      
      <fieldset className='flex flex-col'>
        <legend className='font-mont font-thin text-gray-100'>Name</legend>
        <Input 
          type='text'
          placeholder='Add team name'
          clases='p-1 rounded-md font-mont font-medium bg-gray-300 outline-none focus:bg-white'
          value={newTeamName}
          change={(e)=>setNewTeamName(e.target.value)}
          focus={true}
          checked={false} 
        />
      </fieldset>
        <div className='flex flex-row gap-5'>
        <fieldset className='flex flex-col w-full'>
          <legend className='font-mont font-thin text-gray-100'>Does it have a stadium?</legend>
          <label 
            htmlFor="stadium-yes"
            className='flex flex-row gap-1 font-mont font-medium text-white'
          >
            <Input 
              id="stadium-yes"
              type="radio"
              name="staium"
              value='yes'
              change={()=>setNewTeamStadium("yes")}
              clases="inline"
              checked={true}
            />
              Yes
          </label>
          <label 
            htmlFor="stadium-no"
            className='flex flex-row gap-1 font-mont font-medium text-white'
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
          
        
        <fieldset className='flex flex-col w-full'>
          <span className='font-mont font-thin text-gray-100'>Select DT:</span>
          <select 
            className='p-1 rounded-md bg-gray-300 font-mont font-medium outline-none focus:bg-white'
            >
            <option selected className='font-mont font-medium'>None</option>
            <option className='font-mont font-medium'>Juan</option>
            <option className='font-mont font-medium'>Pedro</option>
          </select>
        </fieldset>
      </div>
    <div className='w-full mt-8'>
      <Button
        title='Add team'
        clases='w-[10%] p-1 font-mont font-medium text-white bg-green-500 rounded-md hover:bg-green-600'
        onclick={handleTeam}
      />
      </div>
    </div>
  )
}

export default DataForm