import React from 'react'
import FootballSevice from '../../services';
import { TeamTypes, DTTypes, PlayerTypes } from '../../types';

const DataTable : React.FC= () => {
  
  const [teams, setTeams] = React.useState<TeamTypes[]>(FootballSevice.getTeam())
  const [editingTeamId, setEditingTeamId] = React.useState<number | null>(null);
  const [editedTeamName, setEditedTeamName] = React.useState<string>("");
  const [stadium, setStadium] = React.useState<string>("yes");
  
  // Function for handling edit Actions.
  const handleEditStart=(id:number, name: string)=>{
    setEditingTeamId(id);
    setEditedTeamName(name);
  }
  
  const handleEditCancel=()=>{
    setEditingTeamId(null);
    setEditedTeamName("");
  }

  const handleEditSave=(id:number)=>{
    if(editedTeamName.trim() !== ""){
      const updateTeam = FootballSevice.updateTeam({
        id,
        name: editedTeamName,
        stadium: stadium
      });
      setTeams((prevTeam) => prevTeam.map((team) => (team.id === id ? updateTeam : team)));

      setEditingTeamId(null);
      setEditedTeamName("");
    }
  }

  const handleDeleteTeam=(id:number)=>{
    FootballSevice.deleteTeam(id);
    setTeams((prevTeam) => prevTeam.filter((team) => team.id !== id));
  }

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h2> teams </h2>
      </div>
      <div className='flex flex-row gap-6'>
        {teams.map((team)=>(
          <div 
            key={team.id}
            className="bg-red-200 rounded-md"  
          >
            {editingTeamId === team.id ? (
              <div>
                <div>
                  <span>Team:</span>
                  <input 
                    type="text"
                    value={editedTeamName}
                    onChange={(e)=>setEditedTeamName(e.target.value)}
                    />
                  </div>
                  <fieldset className='flex flex-col'>
                    <legend>Does it havea stadium?</legend>
                    <label 
                      htmlFor="stadium-yes"
                    >
                      <input 
                        id="stadium-yes" 
                        type="radio" 
                        name="stadium" 
                        value="yes"
                        onChange={()=>setStadium("yes")}
                        className="inline" 
                        // checked={team.stadium == 'yes' }
                      /> 
                        Yes
                    </label>
                    <label 
                      htmlFor="stadium-no"
                    >
                      <input 
                        id="stadium-no" 
                        type="radio" 
                        name="stadium"
                        value="no" 
                        onChange={()=>setStadium("no")}
                        className="inline" 
                        // checked={team.stadium == 'no'}
                      />
                        No
                      </label>
                  </fieldset>
                  
                  <fieldset>
                    <span>Entrenador:</span>
                    <span>{team.dt?.name}</span>
                  </fieldset>

                  <fieldset>
                    <span>Juagadores:</span>
                    <div >
                      {team.players?.map((player) =>(
                        <span key={player.id}>{player.name}
                          <input type="checkbox"/>
                        </span>
                      ))}
                    </div>
                </fieldset>
                <button  onClick={()=>handleEditCancel()}>Cancel</button>
                <button onClick={()=>handleEditSave(team.id)}>Guardar</button>
              </div>
              ):(
              <div>
                <div>
                  <span>Team:</span>
                  <span>{team.name}</span>
                </div>
                <div>
                  <span>Stadium:</span>
                  <span>{team.stadium}</span>
                </div>
                <div>
                  <span>Entrenador:</span>
                  <span>{team.dt?.name}</span>
                </div>
                <fieldset>
                    <span>Juagadores:</span>
                    <ul>
                      {team.players?.map((juagador)=>(
                        <li>
                          <span>Nombre: {juagador.numbers}</span>
                          <span>Posicion: {juagador.position}</span>
                        </li>
                      ))}
                    </ul>
                </fieldset>
                <div className='flex flex-row'>
                  <button 
                    className='text-white border-2 bg-blue-400 border-blue-400 rounded-md p-1 hover:bg-blue-500 hover:border-blue-500 hover:text-white' 
                    onClick={()=>handleEditStart(team.id, team.name)}
                  >Editar
                  </button>
                  <button 
                    className='text-white border-2 bg-red-400 border-red-400 rounded-md p-1 hover:bg-red-500 hover:border-red-500 hover:text-white' 
                    onClick={()=>handleDeleteTeam(team.id)}
                    >Eliminar
                  </button>   
                </div>
              </div>
            )}

          
          </div>
        ))}
      </div>
    </div>
  )

}

export default DataTable