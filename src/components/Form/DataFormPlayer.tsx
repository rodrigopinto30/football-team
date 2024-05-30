import React, { useState, Dispatch, SetStateAction} from 'react'
import FootballSevice from '../../services';
import { PlayerTypes } from '../../types'

interface Props {
  setPlayers: Dispatch<SetStateAction<PlayerTypes[]>>;
}

const DataFormPlayer:React.FC<Props> = ({setPlayers}) => {

  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [newPlayerLastname, setNewPlayerLastname] = useState<string>("");
  const [newPlayerNumber, setNewPlayerNumber] = useState<number>(0);
  const [newPlayerPosition, setNewPlayerPosition] = useState<string>("");

  const handlePlayer =()=>{
    if(newPlayerName.trim() !== ""){
      const newPlayer = FootballSevice.addPlayer(newPlayerName, newPlayerLastname, newPlayerNumber, newPlayerPosition);
      setPlayers((prevPlayer) =>[...prevPlayer, newPlayer]);
      setNewPlayerName("");
      setNewPlayerLastname("");
      setNewPlayerNumber(0);
    }else{
      alert("Debes ingresar los datos correctamente.");
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-white bg-opacity-10 rounded-md backdrop-blur-md w-[60%]">
      
      <fieldset className="flex flex-col">
        <legend className='text-white'>Name</legend>
        <input 
          type="text"
          className='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
          placeholder='Add player name'
          value={newPlayerName}  
          onChange={(e)=>setNewPlayerName(e.target.value)}
          autoFocus={true}
        />
      </fieldset>

      <fieldset className="flex flex-col">
        <legend className='text-white'>Last name </legend>
        <input 
          type="text"
          className='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
          placeholder='Add player last name'
          value={newPlayerLastname}  
          onChange={(e)=>setNewPlayerLastname(e.target.value)}
          autoFocus={true}
        />
      </fieldset>

      <fieldset className="flex flex-col">
        <legend className='text-white'>Number</legend>
        <input 
          type="number"
          className='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
          min={1}
          max={50}
          placeholder='Add player number'
          value={newPlayerNumber}  
          onChange={(e)=>setNewPlayerNumber(parseInt(e.target.value))}
          autoFocus={true}
        />
      </fieldset>

      <div className="flex flex-col">
        <span className='text-white'>Position</span>
        <select 
          className='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
          onChange={(e)=>setNewPlayerPosition(e.target.value)}
        >
          <option selected>Arquero</option>
          <option>Defensor</option>
          <option>Mediocampista</option>
          <option>Delantero</option>
        </select>
      </div>

      <div className='w-full'>
      <button
        className='text-white p-1 bg-green-700 rounded-md hover:bg-green-500'
          onClick={handlePlayer}
        >
          Add Team
        </button>
    </div>
      
    </div>
  )
}

export default DataFormPlayer