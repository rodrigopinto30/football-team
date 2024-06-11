import React, { Dispatch, SetStateAction, useState } from 'react'
import FootballSevice from '../../services';
import { DTTypes, TeamTypes } from '../../types';
import Button from './Button';
import Input from './Input'

interface Props {
  setDTs: Dispatch<SetStateAction<DTTypes[]>>;
}

const DataFormDT : React.FC<Props> = ({setDTs}) => {

  const [newDtName, setNewDtName] = useState<string>("");
  const [newDtLastname, setNewDtLastname] = useState<string>("");
  const [newDtTeam, setNewDtTeam] = useState<TeamTypes>();
  const [newDtFormation, setNewDtFormation] = useState<string>("");
  const [changed, setChanged] = useState<boolean>(false);

  const handleDt =()=>{
    if(newDtName.trim() !== ""){
      const newDt = FootballSevice.addDt(newDtName, newDtLastname, newDtFormation);
      setDTs((prevDt)=>[...prevDt, newDt]);
      setNewDtName("");
      setNewDtLastname("");
      setNewDtFormation("");
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
            placeholder='Add DT name'
            value={newDtName}  
            change={(e)=>setNewDtName(e.target.value)}
            focus={true}
          />
      </fieldset>

      <fieldset className="flex flex-col">
        <legend className='font-mont font-thin text-gray-100'
        >Last name</legend>
          <Input 
            type="text"
            clases='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
            placeholder='Add DT last name'
            value={newDtLastname}  
            change={(e)=>setNewDtLastname(e.target.value)}
            focus={true}
          />
      </fieldset>

      <div className='flex flex-row gap-5'>
      <fieldset className="flex flex-col w-full">
        <legend className='font-mont font-thin text-gray-100'
        >Formation</legend>
          <Input 
            type="text"
            clases='p-1 rounded-md bg-gray-300 outline-none focus:bg-white'
            placeholder='Add formation'
            value={newDtFormation}  
            change={(e)=>setNewDtFormation(e.target.value)}
            focus={true}
          />
      </fieldset>

      <fieldset className="flex flex-col w-full">
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
      </div>

      <div className='w-full mt-8'>
        <Button
          title='Add team'
          clases='w-[10%] p-1 font-mont font-medium text-white bg-green-500 rounded-md hover:bg-green-600'
          onclick={handleDt}
        />
    </div>
      
    </div>
  )
}

export default DataFormDT;