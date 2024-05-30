import React from 'react'
import FootballSevice from '../../services'
import { PlayerTypes } from '../../types'

const DataTablePlayer = () => {

    const [players, setPlayers] = React.useState<PlayerTypes[]>(FootballSevice.getPlayer());
    const [editingPlayerId, setEditingPlayerId] = React.useState<number | null>(null);
    
    const [editedPlayerName, setEditedPlayerName] = React.useState<string>("");
    const [editedPlayerLastname, setEditedPlayerLastname] = React.useState<string>("");
    const [editedPlayerNumber, setEditedPlayerNumber] = React.useState<number>(0);
    const [editedPlayerPosition, setEditedPlayerPosition] = React.useState<string>("");
    // const [editedPlayerTeam, setEditedPlayerTeam] = React.useState<PlayerTypes>();

    const handleEditStart =(id:number, name:string, lastName:string, numbers:number, position:string)=>{
        setEditingPlayerId(id)
        setEditedPlayerName(name);
        setEditedPlayerLastname(lastName);
        setEditedPlayerNumber(numbers);
        setEditedPlayerPosition(position);
    }

    const handleEditCancel =()=>{
        setEditingPlayerId(null);
    }

    const handleEditSave =(id:number)=>{
        if(editedPlayerName.trim() !== ""){
            const updatePlayer = FootballSevice.updatePlayer({
                id,
                name: editedPlayerName,
                lastName: editedPlayerLastname,
                numbers: editedPlayerNumber,
                position: editedPlayerPosition
            })

            setPlayers((prevPlayer) => prevPlayer.map((player) =>(player.id === id ? updatePlayer : player)))
            setEditingPlayerId(null);
        }
    }

    const handleDeletePlayer =(id:number)=>{
        FootballSevice.deletePlayer(id);
        setPlayers((prevPlayer) => prevPlayer.filter((player) => player.id !== id));
    }

    return (
        <div className="flex flex-row gap-6">
            {players.map((player)=>(
                <div
                    key={player.id}
                    className="bg-red-200 rounded-md"
                >
                    {editingPlayerId === player.id ? (
                        <div>
                            <fieldset>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={editedPlayerName}
                                    onChange={(e)=>setEditedPlayerName(e.target.value)}
                                />
                            </fieldset>
                            <fieldset>
                                <label>Last name:</label>
                                <input 
                                    type="text" 
                                    value={editedPlayerLastname}
                                    onChange={(e)=>setEditedPlayerLastname(e.target.value)}/>
                            </fieldset>
                            <fieldset>
                                <label>Number:</label>
                                <input type="number"
                                    min={1}
                                    max={50}
                                    value={editedPlayerNumber}
                                    onChange={(e)=>setEditedPlayerNumber(parseInt(e.target.value))}    
                                />
                            </fieldset>
                            <fieldset>
                                <label>Position:</label>
                                <span>{editedPlayerPosition}</span>
                            </fieldset>

                            <fieldset>
                                <button onClick={()=>handleEditCancel()}>Cancelar</button>
                                <button onClick={()=>handleEditSave(player.id)}>Guardar</button>
                            </fieldset>
                        </div>
                    ):
                        <div>
                            <fieldset>
                                <label>Player:</label>
                                <span>{player.name}</span>
                            </fieldset>
                            <fieldset>
                                <label>Last name:</label>
                                <span>{player.lastName}</span>
                            </fieldset>
                            <fieldset>
                                <label>Number:</label>
                                <span>{player.numbers}</span>
                            </fieldset>
                            <fieldset>
                                <label>Postion:</label>
                                <span>{player.position}</span>
                            </fieldset>
                            
                            <div className='flex flex-row'>
                                <button 
                                    className=''
                                    onClick={()=>handleEditStart(player.id, player.name, player.lastName, player.numbers, player.position)}    
                                >
                                    Editar
                                </button>

                                <button
                                    className=''
                                    onClick={()=>handleDeletePlayer(player.id)}
                                >
                                    Elimianr
                                </button>
                            </div>
                        </div>
                        
                    }
                </div>
            ))}
        </div>
    )
}

export default DataTablePlayer