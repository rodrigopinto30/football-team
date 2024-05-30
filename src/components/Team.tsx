import React, {useState} from 'react'
import FootballSevice from '../services'
import DataForm from './Form/DataForm'
import DataTable from './Form/DataTable'
import Title from './Title'
import { TeamTypes } from '../types'
const Team:React.FC = () => {
  
  const[teams, setTeams] = useState<TeamTypes[]>(FootballSevice.getTeam);

  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
        <Title
          titulo="ADD TEAM"
        />
        <DataForm setTeams={setTeams}/>
        <DataTable/>
    </div>
  )
}

export default Team