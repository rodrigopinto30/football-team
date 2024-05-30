import React, {useState} from 'react';
import DataFormPlayer from './Form/DataFormPlayer'
import Title from './Title'
import FootballSevice from '../services';
import { PlayerTypes } from '../types';
import DataTablePlayer from './Form/DataTablePlayer';

const Player = () => {

  const [players, setPlayers] = useState<PlayerTypes[]>(FootballSevice.getPlayer);
    
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
        <Title titulo="ADD PLAYER" />
        <DataFormPlayer setPlayers={setPlayers}/>
        <DataTablePlayer />
    </div>
  )
}

export default Player