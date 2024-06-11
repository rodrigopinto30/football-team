import React, { useState, Dispatch, SetStateAction} from 'react'
import FootballSevice from '../../services';
import { PlayerTypes } from '../../types'
import Button from './Button';
import Input from './Input';

interface Props {
  setPlayers: Dispatch<SetStateAction<PlayerTypes[]>>;
}

const DataFormPlayer:React.FC<Props> = ({setPlayers}) => {

  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [newPlayerLastname, setNewPlayerLastname] = useState<string>("");
  const [newPlayerNumber, setNewPlayerNumber] = useState<number>(0);
  const [newPlayerPosition, setNewPlayerPosition] = useState<string>("");
  const [changed, setChanged] = useState<boolean>(false);

  const handlePlayer =()=>{
    if(newPlayerName.trim() !== ""){
      const newPlayer = FootballSevice.addPlayer(newPlayerName, newPlayerLastname, newPlayerNumber, newPlayerPosition);
      setPlayers((prevPlayer) =>[...prevPlayer, newPlayer]);
      setNewPlayerName("");
      setNewPlayerLastname("");
      setNewPlayerNumber(0);
      setChanged(true);
    }else{
      alert("Debes ingresar los datos correctamente.");
    }
  }

  React.useEffect(()=>{
    if(changed){
      window.location.reload();
      }
  },[changed]);

  return (
    <div className="flex flex-col gap-3 p-4 bg-white bg-opacity-10 rounded-md backdrop-blur-md w-[60%]">
      
      <fieldset className="flex flex-col">
        <legend className='font-mont font-thin text-gray-100'>Name</legend>
          <Input 
            type="text"
            clases='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
            placeholder='Add player name'
            value={newPlayerName}  
            change={(e)=>setNewPlayerName(e.target.value)}
            focus={true}
          />
      </fieldset>

      <fieldset className="flex flex-col">
        <legend className='font-mont font-thin text-gray-100'>Last name</legend>
          <Input 
            type="text"
            clases='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
            placeholder='Add player last name'
            value={newPlayerLastname}  
            change={(e)=>setNewPlayerLastname(e.target.value)}
            focus={true}
          />
      </fieldset>
      
      <div className='flex flex-row gap-5'>
        <fieldset className="flex flex-col w-full">
          <legend className='font-mont font-thin text-gray-100'>Number</legend>
          <Input 
            type="number"
            clases='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
            min={1}
            max={50}
            placeholder='Add player number'
            value={newPlayerNumber}  
            change={(e)=>setNewPlayerNumber(parseInt(e.target.value))}
            focus={true}
          />
        </fieldset>

        <fieldset className="flex flex-col w-full">
          <span className='font-mont font-thin text-gray-100'>Position</span>
          <select 
            className='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
            onChange={(e)=>setNewPlayerPosition(e.target.value)}
          >
            <option selected>Arquero</option>
            <option>Defensor</option>
            <option>Mediocampista</option>
            <option>Delantero</option>
          </select>
        </fieldset>
      </div>

      <div className='w-full mt-8'>
        <Button
          title='Add team'
          clases='w-[10%] p-1 font-mont font-medium text-white bg-green-500 rounded-md hover:bg-green-600'
          onclick={handlePlayer}
        />
    </div>
      
    </div>
  )
}

export default DataFormPlayer