import React , {useState} from 'react'
import DataFormDT from './Form/DataFormDT'
import DataTableDT from './Form/DataTableDT'
import Title from './Title'
import { DTTypes } from '../types';
import FootballSevice from '../services';

const DT = () => {

  const [DTs, setDTs] = useState<DTTypes[]>(FootballSevice.getDts);
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
    <Title titulo="ADD DT" />
    <DataFormDT setDTs={setDTs}/>
    <DataTableDT />
</div>
  )
}

export default DT